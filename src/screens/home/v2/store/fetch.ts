/*
 * @Author: czy0729
 * @Date: 2023-02-27 20:20:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-27 20:22:41
 */
import { collectionStore, subjectStore, userStore } from '@stores'
import { getTimestamp, queue } from '@utils'
import { CollectionsOrder, CollectionStatus, SubjectId, SubjectType } from '@types'
import {
  MODEL_COLLECTIONS_ORDERBY,
  MODEL_COLLECTION_STATUS,
  MODEL_SUBJECT_TYPE
} from '@constants'
import Computed from './computed'
import { EXCLUDE_STATE } from './ds'

export default class Fetch extends Computed {
  /** 请求条目信息 */
  fetchSubject = (subjectId: SubjectId, index: number = 0) => {
    let flag = false

    const subject = this.subject(subjectId)
    let { _loaded } = subject
    if (typeof _loaded !== 'number') _loaded = 0

    // 请求间隔至少为 15 分钟
    if (
      subject?._responseGroup !== 'large' ||
      getTimestamp() - _loaded >= 60 * (15 + index)
    ) {
      flag = true
    }

    if (flag) return subjectStore.fetchSubject(subjectId)

    return true
  }

  /** 队列请求条目信息 */
  fetchSubjectsQueue = async (list = []) => {
    const fetchs = this.sortList(list).map(({ subject_id }, index) => async () => {
      await userStore.fetchUserProgress(subject_id)
      return this.fetchSubject(subject_id, index)
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
