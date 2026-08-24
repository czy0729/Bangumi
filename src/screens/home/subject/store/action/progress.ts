/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 01:32:55
 */
import { subjectStore, userStore } from '@stores'
import { getInt } from '@stores/subject'
import { asc, confirm, info } from '@utils'
import { logger } from '@utils/dev'
import { t } from '@utils/fetch'
import { webhookEp } from '@utils/webhooks'
import { MODEL_EP_STATUS, TEXT_MENU_TOPIC } from '@constants'
import { COMPONENT } from '../../ds'
import Collection from './collection'

import type { EpStatus, Navigation } from '@types'
import type { EpsItem } from '../../types'

/** 收视进度更新 */
export default class Progress extends Collection {
  /** 更新收视进度 */
  doUpdateEpStatus = async (value: string, item: EpsItem) => {
    const status = MODEL_EP_STATUS.getValue<EpStatus>(value)
    this.prepareEpsFlip()

    try {
      // 更新收视进度
      await userStore.doUpdateEpStatus({
        id: item.id,
        status
      })
    } catch (error) {
      info('更新失败, 请重试')
      return
    }

    this.refreshProgress()

    webhookEp(
      {
        ...item,
        status,
        batch: false
      },
      this.subject,
      userStore.userInfo
    )

    t('条目.章节菜单操作', {
      title: '更新收视进度',
      subjectId: this.subjectId,
      status
    })
  }

  /**
   * 更新进度相关方法
   *
   * 统一入口: doUpdateEp — 所有需要更新服务端收视进度的操作, 最终都应通过此方法提交
   *   └─ collectionStore.doUpdateSubjectEp → xhr 提交 → 回调中刷新进度 + webhook
   *
   * 普通条目 (动画/三次元):
   *   doUpdateSubjectEp     输入框点「更新」/ 键盘 done → doUpdateEp
   *   doUpdateSubjectWatched 章节按钮点击「看到」→ userStore.doUpdateSubjectWatched (绕过 doUpdateEp)
   *   doEpsSelect           章节长按菜单 → doUpdateSubjectWatched 或 doUpdateEpStatus
   *   doEpsLongPress        章节按钮长按, 切换看过/撤销 → userStore.doUpdateEpStatus (绕过 doUpdateEp)
   *   autoCompleteEps       标记「看过」时自动填满全部集数 → doUpdateEp
   *
   * 书籍条目:
   *   doUpdateBookEp        书籍输入框点「更新」→ doUpdateEp
   *   doUpdateNext          书籍 +1 按钮 → doUpdateEp
   *
   * 注: doUpdateSubjectWatched 和 doUpdateEpStatus 绕过了 doUpdateEp,
   *     回调中手动做了 refreshProgress, 但没有 fetchSubjectFromHTML.
   */

  /** 章节按钮点击「看到」, 批量更新收视进度到该集 (绕过 doUpdateEp, 直接走 userStore) */
  doUpdateSubjectWatched = async (item: EpsItem) => {
    t('条目.章节菜单操作', {
      title: '批量更新收视进度',
      subjectId: this.subjectId
    })

    /**
     * 批量更新收视进度
     * @issue 多季度非 1 开始的番不能直接使用 sort, 需要把 sp 去除后使用当前 item.sort 查找 index
     */
    const mainEps = (this.subject.eps || [])
      .filter(i => i.type === 0)
      .sort((a, b) => asc(a, b, item => item.sort || 0))
    const sort = mainEps.findIndex(i => i.sort === item.sort)

    let value: number
    if (sort === -1) {
      /**
       * @issue 老 API bug, 多季度番剧使用 item.sort 不适用, 若item.sort > totalEps, 适用排序的 index
       * @date 2022/02/12
       * @note 此分支 sort 恒为 -1, 不能再用 sort + 1 (会提交 0 清空进度), 取正篇最后一集的序号兜底
       */
      const totalEps = Number(this.subjectFormHTML.totalEps)
      value = totalEps && item.sort >= totalEps ? mainEps.length || totalEps : item.sort
    } else {
      value = sort + 1
    }

    // [待迁移] 老 API 不支持任何 NSFW 的修改
    if (this.nsfw) {
      this.doUpdateEp({
        eps: value
      })
      return
    }

    this.prepareEpsFlip()
    try {
      await userStore.doUpdateSubjectWatched({
        subjectId: this.subjectId,
        sort: value
      })
    } catch (error) {
      info('更新失败, 请重试')
      return
    }
    this.refreshProgress()

    webhookEp(
      {
        ...item,
        status: 'watched',
        batch: true
      },
      this.subject,
      userStore.userInfo
    )
  }

  /** 章节按钮长按弹出菜单, 根据选择分发到 doUpdateSubjectWatched / doUpdateEpStatus / toEp / toPlay */
  doEpsSelect = async (value: string, item: EpsItem, navigation?: Navigation) => {
    try {
      // iOS 是本集讨论, 安卓是 (+N)...
      if (value.includes(TEXT_MENU_TOPIC) || value.includes('(+')) {
        this.toEp(item, navigation)
        return
      }

      if (value === '正版播放') {
        this.toPlay(item)
        return
      }

      if (value === '添加提醒') {
        this.doSaveCalenderEvent(item)
        return
      }

      // 未收藏不能更改进度
      const { status = { name: '未收藏' } } = this.collection
      if (status.name !== '未收藏') {
        const status = MODEL_EP_STATUS.getValue<EpStatus>(value)
        if (status) {
          this.doUpdateEpStatus(value, item)
          return
        }

        if (value === '看到') {
          if (item?.sort > 24) {
            confirm(`确认看到${item.sort}集?`, () => {
              this.doUpdateSubjectWatched(item)
            })
            return
          }

          this.doUpdateSubjectWatched(item)
          return
        }

        return
      }

      info('收藏了才能管理哦')
    } catch (error) {
      logger.error(COMPONENT, 'doEpsSelect', error)
    }
  }

  /** 书籍 +1 按钮, 将 chap 或 vol 自增后提交 → doUpdateEp */
  doUpdateNext = async (name: string | number) => {
    const { chap, vol } = this.state
    const next = String(parseInt(this.state[name] || 0) + 1)
    const query = {
      subjectId: this.subjectId,
      chap,
      vol,
      [name]: next
    }

    // 20220414 nsfw 无效，待废弃，改用 doUpdateSubjectEp
    this.doUpdateEp(
      {
        eps: query.chap,
        vol: query.vol
      },
      true
    )

    t('条目.更新书籍下一个章节', {
      subjectId: this.subjectId
    })
  }

  /** 书籍输入框点「更新」, 提交当前 chap 和 vol → doUpdateEp */
  doUpdateBookEp = async () => {
    const { chap, vol } = this.state

    // 20220414 nsfw 无效，待废弃，改用 doUpdateEp
    this.doUpdateEp(
      {
        eps: chap || '0',
        vol: vol || '0'
      },
      true
    )

    t('条目.更新书籍章节', {
      subjectId: this.subjectId
    })
  }

  /** 普通条目输入框点「更新」/ 键盘 done, 提交当前 watchedEps → doUpdateEp */
  doUpdateSubjectEp = async (value?: string) => {
    const { watchedEps } = this.state

    // 20220414 nsfw 无效，待废弃，改用 doUpdateEp
    this.doUpdateEp({
      eps: value || watchedEps || '0'
    })

    t('条目.输入框更新章节', {
      subjectId: this.subjectId
    })
  }

  /** 标记「看过」时自动填满全部集数 (动画取 totalEps, 书籍取 totalChap/totalVol) → doUpdateEp */
  autoCompleteEps = async () => {
    const last = getInt(this.subjectId)
    const STATE_KEY = `subjectFormHTML${last}` as const
    await subjectStore.init(STATE_KEY)

    if (this.type === '动画' || this.type === '三次元') {
      const eps =
        Number(subjectStore.subjectFormHTML(this.subjectId)?.totalEps) ||
        Number((await subjectStore.fetchSubjectFromHTML(this.subjectId))?.totalEps)
      if (eps) {
        this.doUpdateEp({ eps })
        return
      }
    }

    if (this.type === '书籍') {
      const book = (await subjectStore.fetchSubjectFromHTML(this.subjectId))?.book
      const eps = Number(book?.totalChap) || undefined
      const vol = Number(book?.totalVol) || undefined
      if (eps || vol) {
        this.doUpdateEp({ eps, vol })
        return
      }
    }
  }

  /** 章节更新统一入口, 所有进度更新最终汇聚于此, 提交到 collectionStore 并刷新本地状态 */
}
