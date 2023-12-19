/*
 * @Author: czy0729
 * @Date: 2023-02-27 20:20:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-20 05:24:05
 */
import { collectionStore, subjectStore, userStore } from '@stores'
import { getTimestamp, queue } from '@utils'
import { decode } from '@utils/protobuf'
import {
  MODEL_COLLECTIONS_ORDERBY,
  MODEL_COLLECTION_STATUS,
  MODEL_SUBJECT_TYPE
} from '@constants'
import { CollectionsOrder, CollectionStatus, SubjectId, SubjectType } from '@types'
import Computed from './computed'
import { EXCLUDE_STATE } from './ds'

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

    // 每个条目再次请求间隔以 4 小时为间隔 index 为递增
    if (
      subject?._responseGroup !== 'large' ||
      getTimestamp() - _loaded >= 60 * 60 * 4 * (index + 1)
    ) {
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
  fetchSubjectsQueue = async (list = []) => {
    const { fetching } = this.state.progress
    if (fetching) return false

    const fetchs = this.sortList(list).map(({ subject_id }, index) => () => {
      return this.fetchSubject(subject_id, index, true)
    })

    if (fetchs.length) {
      this.setState({
        progress: {
          fetching: true
        }
      })
    }

    await queue(fetchs, 2)
    this.setState({
      progress: EXCLUDE_STATE.progress
    })

    return true
  }

  /** 请求条目收视进度 */
  fetchUserProgress = (subjectId?: SubjectId) => {
    return userStore.fetchUserProgress(subjectId)
  }

  /** 请求在玩的游戏 */
  fetchDoingGames = (refresh?: boolean) => {
    const { username } = this.usersInfo
    return collectionStore.fetchUserCollections(
      {
        userId: username || this.userId,
        subjectType: MODEL_SUBJECT_TYPE.getLabel<SubjectType>('游戏'),
        type: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>('在看'),
        order: MODEL_COLLECTIONS_ORDERBY.getValue<CollectionsOrder>('收藏时间'),
        tag: ''
      },
      refresh
    )
  }
}
