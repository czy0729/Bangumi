/*
 * @Author: czy0729
 * @Date: 2024-05-16 19:56:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-10 04:05:45
 *
 * 超展开页请求
 */
import { rakuenStore, userStore } from '@stores'
import { getTimestamp } from '@utils'
import { searchEncoreReplies } from '@utils/kv'
import Computed from './computed'
import { mapSubjectReplies, SUBJECT_REPLY_LIMIT } from './utils'

import type { RakuenItem } from '@stores/rakuen/types'
import type { SubjectReplies } from './ds'

export default class Fetch extends Computed {
  private subjectRepliesRequest: Promise<SubjectReplies> | null = null

  /** 拉取当前板块的列表 */
  fetchRakuen = async () => {
    const type = this.type(this.state.page)
    if (type === 'subject_reply') return this.fetchSubjectReplies()

    return type === 'hot'
      ? rakuenStore.fetchRakuenHot()
      : rakuenStore.fetchRakuen(this.state.scope, type)
  }

  /** 条目下我回复过的讨论 */
  fetchSubjectReplies = () => {
    if (this.subjectRepliesRequest) return this.subjectRepliesRequest

    this.subjectRepliesRequest = this.requestSubjectReplies().finally(() => {
      this.subjectRepliesRequest = null
    })
    return this.subjectRepliesRequest
  }

  private requestSubjectReplies = async (): Promise<SubjectReplies> => {
    const userId = userStore.myId
    if (!userId) return this.state.subjectReplies

    let list: RakuenItem[] | undefined
    try {
      const result = await searchEncoreReplies({
        q: `user:${userId} exclude:nsfw`,
        source: 'subject',
        sort: 'newest',
        limit: SUBJECT_REPLY_LIMIT
      })
      if (result) list = mapSubjectReplies(result.data)
    } catch (error) {
      // do nothing
    }

    const succeed = list !== undefined
    this.setState({
      subjectReplies: {
        list: list || this.state.subjectReplies.list,
        pagination: {
          page: 1,
          pageTotal: 1
        },
        _loaded: getTimestamp(),
        _userId: userId,
        _error: !succeed
      }
    })
    if (succeed) this.save()
    return this.state.subjectReplies
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchRakuen()
  }
}
