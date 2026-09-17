/*
 * @Author: czy0729
 * @Date: 2023-02-27 20:20:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-24 18:44:03
 */
import { collectionStore, subjectStore, systemStore, timelineStore, userStore } from '@stores'
import { getTimestamp, queue } from '@utils'
import { logger } from '@utils/dev'
import { decode } from '@utils/thirdParty/protobuf'
import {
  H1,
  H6,
  MODEL_COLLECTION_STATUS,
  MODEL_COLLECTIONS_ORDERBY,
  MODEL_SUBJECT_TYPE
} from '@constants'
import Computed from './computed'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

import type { UserCollectionItem } from '@utils/fetch.v0/types'
import type { CollectionsOrder, CollectionStatus, SubjectId, SubjectType } from '@types'

export default class Fetch extends Computed {
  /** 加载 bangumi-data */
  fetchBangumiData = async () => {
    if (this.state.loadedBangumiData) return

    await decode('bangumi-data')
    this.setState({
      loadedBangumiData: true
    })
  }

  /** 请求条目信息 */
  fetchSubject = async (
    subjectId: SubjectId,
    index: number = 0,
    refreshUserProgress: boolean = false
  ) => {
    let flag = false

    const subject = this.subject(subjectId)
    let { _loaded } = subject
    if (typeof _loaded !== 'number') _loaded = 0

    // 每个条目再次请求间隔以 6 小时为间隔 index 为递增
    if (subject?._responseGroup !== 'large' || getTimestamp() - _loaded >= H6 * (index + 1)) {
      flag = true
    }

    if (flag) {
      const key = this.state.progress.fetchingSubjectId2
        ? 'fetchingSubjectId1'
        : 'fetchingSubjectId2'
      this.setState({
        progress: {
          [key]: subjectId
        }
      })

      if (refreshUserProgress) await this.fetchUserProgress(subjectId)
      await subjectStore.fetchSubject(subjectId)

      this.setState({
        progress: {
          [key]: 0
        }
      })
      return true
    }

    return true
  }

  /** 队列请求条目信息 */
  fetchSubjectsQueue = async (list: UserCollectionItem[] = [], count?: number) => {
    if (this.state.progress.fetching) return false

    const sortedList = this.sortList(list)
    const limitedList = typeof count === 'number' && count ? sortedList.slice(0, count) : sortedList

    // 进度总数取本次实际入队条目数 (由 sortList + count 截断逻辑决定), 与筛选栏显示的收藏总数无关
    const total = limitedList.length

    // 空列表不进 fetching, 也不写 progress, 避免无谓的状态变更
    if (!total) return true

    // 用局部计数而不是读 state 自增: 并发任务 (queue 内部 pLimit) 同时完成时读改写会丢增量
    let done = 0
    const fetchs = limitedList.map(({ subject_id }, index) => async () => {
      try {
        return await this.fetchSubject(subject_id, index, true)
      } finally {
        // 每个条目结束都累加, 最终 current 等于本次入队条目数
        done += 1
        this.setState({
          progress: {
            current: done
          }
        })
      }
    })

    this.setState({
      progress: {
        fetching: true,
        current: 0,
        total
      }
    })

    try {
      await queue(fetchs, 2)
    } catch (error) {
      // 任一请求失败不能中断队列, 否则 progress.fetching 永久为 true, 后续刷新会被拦截
      logger.error(NAMESPACE, 'fetchSubjectsQueue', error)
    } finally {
      this.setState({
        progress: EXCLUDE_STATE.progress
      })
    }

    return true
  }

  /** 请求条目收视进度 */
  fetchUserProgress = (subjectId?: SubjectId) => {
    return userStore.fetchUserProgress(subjectId)
  }

  /** 请求在玩的游戏 */
  fetchDoingGames = (refresh?: boolean) => {
    return collectionStore.fetchUserCollections(
      {
        userId: this.usersInfo.username || this.userId,
        subjectType: MODEL_SUBJECT_TYPE.getLabel<SubjectType>('游戏'),
        type: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>('在看'),
        order: MODEL_COLLECTIONS_ORDERBY.getValue<CollectionsOrder>('收藏时间'),
        tag: ''
      },
      refresh
    )
  }

  /** 追踪特定用户收藏时间线 */
  fetchCollectionTimelines = () => {
    if (!this.isLogin) return false

    const { lastfetchedCollectionTimelines } = this.state
    if (getTimestamp() - Number(lastfetchedCollectionTimelines) < H1) return true

    const { collectionTimelines } = systemStore.setting
    if (!collectionTimelines?.length) return false

    this.setState({
      lastfetchedCollectionTimelines: getTimestamp()
    })
    this.save()

    return queue(
      collectionTimelines.map(userName => () => timelineStore.fetchCollectionTimelines(userName)),
      1
    ).catch(error => {
      logger.error(NAMESPACE, 'fetchCollectionTimelines', error)
      return false
    })
  }
}
