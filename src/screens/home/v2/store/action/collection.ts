/*
 * @Author: czy0729
 * @Date: 2026-08-27 02:45:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 03:52:49
 */
import { collectionStore, userStore } from '@stores'
import { feedback } from '@utils'
import { t } from '@utils/fetch'
import { webhookCollection, webhookEp } from '@utils/webhooks'
import { MODEL_COLLECTION_STATUS, MODEL_EP_STATUS } from '@constants'
import Ui from './ui'

import type { EpStatus, RatingStatus, SubjectId } from '@types'

export default class Collection extends Ui {
  /** 管理收藏 */
  doUpdateCollection = async (values: Parameters<typeof collectionStore.doUpdateCollection>[0]) => {
    await collectionStore.doUpdateCollection(values)
    feedback()

    // 不是在看的话要删掉对应条目信息
    if (values.status !== MODEL_COLLECTION_STATUS.getValue<RatingStatus>('在看')) {
      userStore.removeCollection(values.subjectId)
    }

    this.closeManageModal()
    webhookCollection(values, this.subject(values.subjectId), userStore.userInfo)

    t('首页.管理收藏', {
      subjectId: values.subjectId
    })
  }

  /** 观看下一章节 */
  doWatchedNextEp = async (subjectId: SubjectId) => {
    const state = this.$Item(subjectId)
    if (state.doing) {
      /**
       * 若干秒后没有状态变化强制还原, 以避免网络出错导致没有复原
       * 也有可能是上次在请求时, 销毁了程序导致保存了错误的状态
       */
      setTimeout(() => {
        const state = this.$Item(subjectId)
        if (state.doing) {
          this.setState({
            item: {
              [subjectId]: {
                ...state,
                doing: false
              }
            }
          })
        }
      }, 2000)
      return
    }

    this.setState({
      item: {
        [subjectId]: {
          ...state,
          doing: true
        }
      }
    })

    // 更新最新章节数据
    await this.fetchUserProgress(subjectId)
    this.prepareEpsFlip(subjectId)

    const { id } = this.nextWatchEp(subjectId)
    await userStore.doUpdateEpStatus({
      id,
      status: MODEL_EP_STATUS.getValue<EpStatus>('看过')
    })

    t('首页.观看下一章节', {
      subjectId
    })

    this.setState({
      item: {
        [subjectId]: {
          ...state,
          doing: false
        }
      }
    })
    userStore.fetchCollectionSingle(subjectId, undefined, true)

    // 震动反馈是使用翻转按钮触发的, 若没有展开则没有渲染按钮组件, 需要主动触发
    if (state.expand) {
      this.fetchUserProgress(subjectId)
    } else {
      await this.fetchUserProgress(subjectId)
      feedback()
    }

    webhookEp(
      {
        status: 'watched',
        id,
        batch: false
      },
      this.subject(subjectId),
      userStore.userInfo
    )
  }

  /** 更新书籍下一个章节 */
  doUpdateNext = (
    subjectId: SubjectId,
    epStatus?: string | number,
    volStatus?: string | number
  ) => {
    collectionStore.doUpdateSubjectEp(
      {
        subjectId,
        watchedEps: epStatus,
        watchedVols: volStatus
      },
      () => {
        feedback()
        userStore.fetchCollectionSingle(subjectId)
        webhookEp(
          {
            status: 'watched',
            sort: epStatus,
            vols: volStatus,
            batch: false
          },
          this.subject(subjectId),
          userStore.userInfo
        )
      }
    )

    t('首页.更新书籍下一个章节', {
      subjectId
    })
  }
}
