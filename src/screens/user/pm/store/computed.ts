/*
 * @Author: czy0729
 * @Date: 2024-09-13 00:50:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-07 22:57:40
 */
import { computed } from 'mobx'
import { userStore } from '@stores'
import { HTML_PM_DETAIL_V2, LIST_EMPTY } from '@constants'
import State from './state'

import type { PmDetail } from '@stores/user/types'

export default class Computed extends State {
  /** 已有 ID, 没有为新建 */
  @computed get id() {
    return this.params.id
  }

  /** 必须是数字 ID, 用于发新短信 */
  @computed get userId() {
    return this.params.userId
  }

  /** 短信详情（"全部"视图） */
  @computed get pmDetail() {
    return userStore.pmDetail(this.id)
  }

  /** 短信线程详情 */
  @computed get pmThreadDetail(): PmDetail {
    const { thread } = this.state
    if (!thread || !this.id) return LIST_EMPTY as PmDetail

    const data = userStore.pmDetail(`${this.id}|${thread}`)
    if (!data.list?.length) return data

    const threadTitle = this.threads.find(t => t.id === thread)?.title
    if (!threadTitle) return data

    if (data.list[0]?.threadTitle === threadTitle) return data

    return {
      ...data,
      list: [
        {
          type: 'label',
          name: '',
          avatar: '',
          userId: '',
          content: threadTitle,
          time: '',
          threadId: thread,
          threadTitle
        },
        ...data.list
      ]
    }
  }

  /** 当前展示的短信列表（根据 thread 选择返回对应数据） */
  @computed get pmList() {
    if (this.state.thread) return this.pmThreadDetail

    return this.pmDetail
  }

  /** 线程列表 */
  @computed get threads() {
    return this.pmDetail?.form?.threads || []
  }

  /** 新短信参数 */
  @computed get pmParams() {
    const { pmFormhash, pmMsgReceivers } = this.params
    if (pmFormhash) {
      return {
        formhash: pmFormhash,
        msg_receivers: pmMsgReceivers || '',
        _loaded: true
      }
    }

    return userStore.pmParams(this.userId)
  }

  /** 自己用户 ID (改过用户名后) */
  @computed get myId() {
    return userStore.myId
  }

  /** 顶栏标题 */
  @computed get headerTitle(): string {
    const { thread } = this.state

    let title: string
    if (this.userId) {
      title = '短信'
    } else if (thread) {
      title = this.threads.find(item => item.id === thread)?.title || '全部'
    } else {
      title = '全部'
    }

    const msgCount = this.pmList?.list?.filter(item => item.type !== 'label').length || 0
    if (msgCount) title += ` (${msgCount})`

    return title
  }

  /** 网址 */
  @computed get url() {
    return HTML_PM_DETAIL_V2(this.id, this.state.thread || undefined)
  }
}
