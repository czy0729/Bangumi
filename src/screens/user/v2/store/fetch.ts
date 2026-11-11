/*
 * @Author: czy0729
 * @Date: 2023-04-04 06:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-12 06:05:11
 */
import { collectionStore, usersStore, userStore } from '@stores'
import { info } from '@utils'
import { logger } from '@utils/dev'
import { TABS } from '../ds'
import Computed from './computed'
import { NAMESPACE } from './ds'

import type { CollectionStatus, SubjectType } from '@types'

/** 用于记录已全量拉取过的参数组及其代次 */
const fetched = new Map<string, number>()

/** 全局请求代次, 跨页面实例唯一 */
let globalScoreToken = 0

export default class Fetch extends Computed {
  /** 用户信息 (自己视角) */
  fetchUsersInfo = () => {
    return userStore.fetchUsersInfo(this.userId)
  }

  /** 用户信息 (他人视角) */
  fetchUsers = () => {
    return usersStore.fetchUsers(this.userId)
  }

  /** 收藏统一请求入口 */
  fetchUserCollections = async (refresh: boolean = false) => {
    if (this.isSortByScore) return this.fetchUserCollectionsByScore(refresh)

    return this.fetchUserCollectionsNormal(refresh)
  }

  /**
   * 记录上一个用户收藏概览请求
   *  - 由于用户收藏概览接口在网站流量大的时候, 有可能第二页数据来得比第一页快, 导致第一页数据把第二页覆盖
   *  - 所以必须把请求改为全局串行
   * */
  private _fetchingUserCollections?: Promise<void>

  /** 用户收藏概览 */
  fetchUserCollectionsNormal = async (refreshOrPage: boolean | number = false) => {
    // 如果上一个请求还没结束，先等它结束
    if (this._fetchingUserCollections) {
      await this._fetchingUserCollections
    }

    // 定义当前请求任务
    const task = (async () => {
      const { subjectType, order, tag } = this.state
      const data = await collectionStore.fetchUserCollections(
        {
          subjectType,
          type: this.type,
          order,
          tag,
          userId: this.username
        },
        refreshOrPage
      )

      // 别人的空间：延迟获取收藏状态
      if (!this.isMe) {
        setTimeout(() => {
          collectionStore.fetchCollectionStatusQueue(
            data.list.filter(item => item.collected).map(item => item.id)
          )
        }, 160)
      }

      return data
    })()

    // 记录执行中的 Promise，用于后续等待
    this._fetchingUserCollections = (async () => {
      try {
        await task
      } catch {
        // 忽略错误，只用来等待
      }
    })()

    try {
      const result = await task
      return result
    } finally {
      // 当前任务结束后清除标志
      this._fetchingUserCollections = undefined
    }
  }

  /** 正在进行的评分排序请求: 同参数复用, 参数变化后旧请求作废 */
  private _fetchingByScore?: { finger: string; task: Promise<boolean> }

  /** 当前请求链代次 */
  private _scoreToken = 0

  /** 当前参数组标识 */
  private getScoreFinger = () => {
    const { subjectType, tag } = this.state
    return JSON.stringify([this.username, subjectType, this.type, tag])
  }

  /**
   * 网站评分需要递归请求完所有数据, 再通过本地排序显示
   * 为了防止多次请求, 一次生命周期同一组参数只会进行一次请求
   * */
  fetchUserCollectionsByScore = async (refresh: boolean = false): Promise<boolean> => {
    const finger = this.getScoreFinger()
    // 同参数进行中复用, 避免产生并发请求链; 刷新则等当前链结束后再重拉
    if (this._fetchingByScore?.finger === finger) {
      if (!refresh) return this._fetchingByScore.task

      const current = this._fetchingByScore.task
      return current.then(() => {
        // 等待期间参数已变化: 新参数的链已由其它入口发起
        if (this.getScoreFinger() !== finger) return false

        return this.fetchUserCollectionsByScore(true)
      })
    }

    const token = (this._scoreToken = ++globalScoreToken)
    const task = this.runFetchUserCollectionsByScore(token, finger, refresh)
      .catch(error => {
        logger.error(NAMESPACE, 'fetchUserCollectionsByScore', error)
        info('获取网站评分失败, 请稍后重试')
        return false
      })
      .finally(() => {
        if (this._fetchingByScore?.task === task) {
          this._fetchingByScore = undefined
          this.setState({ scoreFetching: false })
        }
      })
    this._fetchingByScore = { finger, task }

    return task
  }

  private runFetchUserCollectionsByScore = async (
    token: number,
    finger: string,
    refresh: boolean
  ) => {
    const { subjectType } = this.state
    if (token !== this._scoreToken) return false

    if (!refresh && fetched.get(finger)) {
      const { list, pagination } = collectionStore.userCollections(
        this.username,
        subjectType,
        this.type
      )
      // 列表仍是全量数据时只需重新本地排序, 被其他排序覆盖则重新拉取
      if (list.length && pagination.page >= pagination.pageTotal) {
        if (token !== this._scoreToken) return false

        // 标记归属更新为当前链, 避免旧链 abort 时误删
        fetched.set(finger, token)
        this.setState({ scoreFetching: true })
        const sorted = await collectionStore.sortUserCollectionsByScore(
          this.username,
          subjectType,
          this.type,
          () => token !== this._scoreToken
        )
        // 写回被放弃时清掉标记, 下次重新拉取
        if (!sorted) {
          if (fetched.get(finger) === token) fetched.delete(finger)
          return false
        }

        return true
      }
    }

    // 超过阈值时只淘汰最旧的一条, 避免误删其它进行中请求的标记
    if (fetched.size > 100) {
      const oldest = Array.from(fetched.keys())[0]
      if (oldest && oldest !== finger) fetched.delete(oldest)
    }

    fetched.set(finger, token)
    this.setState({ scoreFetching: true })

    // 作废时只回滚自己的标记, 避免误删同参数新链写入的
    const abort = () => {
      if (fetched.get(finger) === token) fetched.delete(finger)

      return false
    }

    try {
      const { pagination } = await this.fetchUserCollectionsNormal(true)
      const { pageTotal } = pagination
      let { page } = pagination
      for (; page < pageTotal; page += 1) {
        // 参数已变化时尽快结束旧请求链
        if (token !== this._scoreToken) return abort()

        await this.fetchUserCollectionsNormal()
      }

      if (token !== this._scoreToken) return abort()

      const sorted = await collectionStore.sortUserCollectionsByScore(
        this.username,
        subjectType,
        this.type,
        () => token !== this._scoreToken
      )
      // 写回被放弃时清掉标记, 下次重新拉取
      if (!sorted) {
        if (fetched.get(finger) === token) fetched.delete(finger)
        return false
      }

      return true
    } catch (error) {
      // 仅当前代次回滚标记, 避免删掉新链刚写入的
      if (fetched.get(finger) === token) fetched.delete(finger)

      throw error
    }
  }

  /** 当前 Tab 一直请求到最后, 用于页内搜索 */
  fetchUntilTheEnd = async (
    lastSubjectType: SubjectType,
    lastType: CollectionStatus,
    isNext: boolean = false
  ): Promise<void> => {
    if (!this.isTabActive(lastSubjectType, lastType, false)) return

    const { subjectType, page } = this.state
    const { key: type } = TABS[page]
    const { pagination } = collectionStore.userCollections(this.username, subjectType, type)
    if (pagination.page >= pagination.pageTotal) {
      if (isNext) {
        logger.log(NAMESPACE, 'fetchUntilTheEnd end')
        this.setState({
          fetching: false
        })
      }
      return
    }

    this.setState({
      fetching: true
    })
    await this.fetchUserCollections()

    return this.fetchUntilTheEnd(lastSubjectType, lastType, true)
  }

  /** 若在搜索模式下, 请求到底, 否则正常请求 */
  fetchIsNeedToEnd = (refresh: boolean = false): Promise<unknown> => {
    const { showFilter, filter, subjectType, page } = this.state
    if (showFilter && filter) return this.fetchUntilTheEnd(subjectType, TABS[page].key)

    return this.fetchUserCollections(refresh)
  }

  /** 若在搜索模式下, 刷新并请求到底, 否则正常请求 */
  fetchIsNeedRefreshToEnd = async (): Promise<unknown> => {
    const { showFilter, filter, subjectType, page } = this.state
    if (showFilter && filter) {
      await this.fetchUserCollections(true)
      return this.fetchUntilTheEnd(subjectType, TABS[page].key)
    }

    return this.fetchUserCollections(true)
  }
}
