/*
 * @Author: czy0729
 * @Date: 2026-08-27 02:45:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 03:53:08
 */
import { collectionStore, userStore } from '@stores'
import { asc, feedback } from '@utils'
import { logger } from '@utils/dev'
import { t } from '@utils/fetch'
import { webhookEp } from '@utils/webhooks'
import { MODEL_EP_STATUS } from '@constants'
import { NAMESPACE } from '../ds'
import { resolveWatchedSort } from '../utils'
import Collection from './collection'

import type { Ep } from '@stores/subject/types'
import type { EpId, EpStatus, SubjectId } from '@types'

export default class Progress extends Collection {
  /** 章节更新统一入口 */
  doUpdateEp = async (value: string | number, item: Ep, subjectId: SubjectId) => {
    try {
      this.prepareEpsFlip(subjectId)

      collectionStore.doUpdateSubjectEp(
        {
          subjectId,
          watchedEps: value
        },
        () => {
          userStore.fetchCollectionSingle(subjectId)
          this.fetchUserProgress(subjectId)

          webhookEp(
            {
              ...item,
              status: 'watched',
              batch: true
            },
            this.subject(subjectId),
            userStore.userInfo
          )
        }
      )
    } catch (error) {
      logger.error(NAMESPACE, 'doUpdateEp', error)
    }
  }

  /** 更新收视进度 */
  doUpdateEpStatus = async (value: string | number, item: Ep, subjectId: SubjectId) => {
    const status = MODEL_EP_STATUS.getValue<EpStatus>(value)

    this.prepareEpsFlip(subjectId)
    await userStore.doUpdateEpStatus({
      id: item.id,
      status
    })
    userStore.fetchCollectionSingle(subjectId, undefined, value === '看过')
    this.fetchUserProgress(subjectId)

    webhookEp(
      {
        ...item,
        status,
        batch: false
      },
      this.subject(subjectId),
      userStore.userInfo
    )

    t('首页.章节菜单操作', {
      title: '更新收视进度',
      subjectId,
      status
    })
  }

  /** 批量更新收视进度 */
  doUpdateSubjectWatched = async (item: Ep, subjectId: SubjectId) => {
    const eps = (this.eps(subjectId) || [])
      .slice()
      .sort((a, b) => asc(a, b, item => item.sort || 0))
    const sort = resolveWatchedSort(eps, this.epsNoSp(subjectId), item.sort)

    // [待迁移] 老 API 不支持任何 NSFW 的修改
    if (this.subject(subjectId)?.v0) {
      this.doUpdateEp(sort, item, subjectId)
      return
    }

    this.prepareEpsFlip(subjectId)
    await userStore.doUpdateSubjectWatched({
      subjectId,
      sort
    })
    userStore.fetchCollectionSingle(subjectId)
    this.fetchUserProgress(subjectId)

    webhookEp(
      {
        ...item,
        status: 'watched',
        batch: true
      },
      this.subject(subjectId),
      userStore.userInfo
    )

    t('首页.章节菜单操作', {
      title: '批量更新收视进度',
      subjectId
    })
  }

  /** @deprecated 章节按钮长按 */
  doEpsLongPress = async (
    {
      id
    }: {
      id: EpId
    },
    subjectId: SubjectId
  ) => {
    const userProgress = this.userProgress(subjectId)
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

    userStore.fetchCollectionSingle(subjectId)
    this.fetchUserProgress(subjectId)

    t('首页.章节按钮长按', {
      subjectId
    })
  }
}
