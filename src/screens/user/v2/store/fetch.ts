/*
 * @Author: czy0729
 * @Date: 2023-04-04 06:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-25 11:43:04
 */
import { collectionStore, usersStore, userStore } from '@stores'
import { info } from '@utils'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatus, SubjectType } from '@types'
import { TABS } from '../ds'
import Computed from './computed'

/** 用于记录 fetchUserCollectionsByScore 是否执行过 */
const fetched: Record<string, boolean> = {}

export default class Fetch extends Computed {
  /** 用户信息 (自己视角) */
  fetchUsersInfo = () => {
    return userStore.fetchUsersInfo(this.userId)
  }

  /** 用户信息 (他人视角) */
  fetchUsers = () => {
    return usersStore.fetchUsers({
      userId: this.userId
    })
  }

  /** 用户收藏 */
  fetchCollections = () => {
    const { subjectType, page } = this.state
    const { _loaded } = this.userCollections(
      subjectType,
      MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(TABS[page].title)
    )
    if (!_loaded) this.fetchUserCollections(true)
  }

  /** 用户收藏概览 (HTML, 全部) */
  fetchUserCollectionsNormal = async (refreshOrPage: boolean | number = false) => {
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

    // 别人的空间
    if (!this.isMe) {
      // 延迟获取收藏中的条目的具体收藏状态
      setTimeout(() => {
        collectionStore.fetchCollectionStatusQueue(
          data.list.filter(item => item.collected).map(item => item.id)
        )
      }, 160)
    }

    return data
  }

  /**
   * 网站评分需要递归请求完所有数据, 再通过本地排序显示
   * 为了防止多次请求, 一次生命周期同一组参数只会进行一次请求
   * */
  fetchUserCollectionsByScore = async () => {
    const { subjectType } = this.state
    const finger = JSON.stringify([this.username, subjectType, this.type])
    if (fetched[finger]) return true

    info('正在获取所有收藏')
    fetched[finger] = true
    const { pagination } = await this.fetchUserCollectionsNormal(true)
    const { pageTotal } = pagination
    let { page } = pagination
    for (; page < pageTotal; page += 1) {
      await this.fetchUserCollectionsNormal()
    }

    info('正在获取所有评分, 实际排序会在之后呈现')
    await collectionStore.sortUserCollectionsByScore(this.username, subjectType, this.type)

    return true
  }

  /** 收藏统一请求入口 */
  fetchUserCollections = async (refresh: boolean = false) => {
    if (this.isSortByScore) return this.fetchUserCollectionsByScore()

    return this.fetchUserCollectionsNormal(refresh)
  }

  /** 当前 Tab 一直请求到最后, 用于页内搜索 */
  fetchUntilTheEnd = async (
    lastSubjectType: SubjectType,
    lastType: CollectionStatus,
    isNext: boolean = false
  ) => {
    if (!this.isTabActive(lastSubjectType, lastType)) return

    const { subjectType, page } = this.state
    const { key: type } = TABS[page]
    const { pagination } = collectionStore.userCollections(this.username, subjectType, type)
    if (pagination.page >= pagination.pageTotal) {
      if (isNext) {
        console.info('fetchUntilTheEnd end')
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
  fetchIsNeedToEnd = (refresh: boolean = false) => {
    const { showFilter, filter, subjectType, page } = this.state
    if (showFilter && filter) return this.fetchUntilTheEnd(subjectType, TABS[page].key)

    return this.fetchUserCollections(refresh)
  }

  /** 若在搜索模式下, 刷新并请求到底, 否则正常请求 */
  fetchIsNeedRefreshToEnd = async () => {
    const { showFilter, filter, subjectType, page } = this.state
    if (showFilter && filter) {
      await this.fetchUserCollections(true)
      return this.fetchUntilTheEnd(subjectType, TABS[page].key)
    }

    return this.fetchUserCollections(true)
  }
}
