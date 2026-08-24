/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-23 07:12:34
 */
import { collectionStore, userStore } from '@stores'
import { confirm, feedback, info } from '@utils'
import { logger } from '@utils/dev'
import { t } from '@utils/fetch'
import { webhookCollection, webhookEp } from '@utils/webhooks'
import { MODEL_COLLECTION_STATUS, MODEL_EP_STATUS } from '@constants'
import { COMPONENT } from '../../ds'
import Social from './social'

import type { EpStatus, Id, RatingStatus } from '@types'

/** 收藏管理 */
export default class Collection extends Social {
  // -------------------- action --------------------
  /** 管理收藏 */
  doUpdateCollection = async (values: Parameters<typeof collectionStore.doUpdateCollection>[0]) => {
    try {
      this.prepareFlip()
      this.setState({
        disabled: true
      })

      await collectionStore.doUpdateCollection({
        ...values,
        noConsole: true
      })
      collectionStore.fetchCollection(this.subjectId)
      collectionStore.fetchCollectionStatusQueue([this.subjectId])

      if (values.status !== MODEL_COLLECTION_STATUS.getValue<RatingStatus>('在看')) {
        // 不是在看的话要在进度中删掉对应条目信息
        userStore.removeCollection(values.subjectId)
      } else {
        // 在看的话要在进度中添加对应条目信息
        userStore.addCollection(values.subjectId)
      }

      this.closeManageModal()
      this.fetchSubjectFromHTML(true)
      webhookCollection(values, this.subject, userStore.userInfo)

      t('条目.管理收藏', {
        subjectId: this.subjectId
      })
    } catch (error) {
      logger.error(COMPONENT, 'doUpdateCollection', error)
    }

    this.setState({
      disabled: false
    })
  }

  /** 本集讨论 */

  doUpdateEp = async (
    { eps, vol }: { eps?: string | number; vol?: string | number },
    isNeedFeedback: boolean = false
  ) => {
    const submit = () => {
      try {
        this.prepareEpsFlip()

        collectionStore.doUpdateSubjectEp(
          {
            subjectId: this.subjectId,
            watchedEps: eps,
            watchedVols: vol
          },
          async () => {
            await this.refreshProgress()
            await this.fetchSubjectFromHTML(true, false)

            this.save()
            this.afterEpsFlip()
            if (isNeedFeedback) {
              info('已提交')
              feedback()
            }

            webhookEp(
              {
                status: 'watched',
                sort: eps,
                vols: vol,
                batch: false
              },
              this.subject,
              userStore.userInfo
            )
          }
        )
      } catch (error) {
        logger.error(COMPONENT, 'doUpdateEp', error)
      }
    }

    if (Number(eps) === 0 && (this.type === '动画' || this.type === '三次元')) {
      confirm('进度更新为 0 的同时会清空所有章节状态，确定？', submit)
      return
    }

    submit()
  }

  /** 章节按钮长按, 切换单集看过/撤销状态 (绕过 doUpdateEp, 直接走 userStore.doUpdateEpStatus) */
  doEpsLongPress = async ({
    id
  }: Partial<{
    id: Id
  }>) => {
    try {
      const userProgress = this.userProgress
      let status: EpStatus
      if (userProgress[id]) {
        // 已观看 -> 撤销
        status = MODEL_EP_STATUS.getValue<EpStatus>('撤销')
      } else {
        // 未观看 -> 看过
        status = MODEL_EP_STATUS.getValue<EpStatus>('看过')
      }

      await userStore.doUpdateEpStatus({
        id,
        status
      })
      feedback()

      this.refreshProgress()

      t('条目.章节按钮长按', {
        subjectId: this.subjectId
      })
    } catch (error) {
      logger.error(COMPONENT, 'doEpsLongPress', error)
    }
  }

  /** 删除收藏 */
  doEraseCollection = async () => {
    const { formhash } = this.subjectFormHTML
    if (!formhash) return

    try {
      this.setState({
        disabled: true
      })

      const callback = () => {
        setTimeout(async () => {
          const data = await collectionStore.fetchCollectionStatusQueue([this.subjectId])
          if (!data?.[this.subjectId]) {
            collectionStore.removeCollection(this.subjectId)
            collectionStore.removeStatus(this.subjectId)
            userStore.removeCollection(this.subjectId)

            t('条目.删除收藏', {
              subjectId: this.subjectId
            })
          }
        }, 2000)
      }

      await userStore.doEraseCollection(
        {
          subjectId: this.subjectId,
          formhash
        },
        callback,
        () => info('删除失败, 请重试')
      )
    } catch (error) {
      logger.error(COMPONENT, 'doEraseCollection', error)
    }

    this.setState({
      disabled: false
    })
  }

  /** 翻译简介 */
}
