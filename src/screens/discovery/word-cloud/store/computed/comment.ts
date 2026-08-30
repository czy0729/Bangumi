/*
 * @Author: czy0729
 * @Date: 2026-08-31 06:58:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 07:35:24
 */
import { computed } from 'mobx'
import { FROZEN_ARRAY } from '@constants'
import { getPlainText, mapSelectedComment } from '../utils'
import Meta from './meta'

import type { SelectedCommentItem } from '../../types'

/** 点击词云后选中的吐槽 */
export default class Comment extends Meta {
  @computed get selectedComment(): readonly SelectedCommentItem[] {
    try {
      const { title } = this.state
      if (this.subjectId) {
        const { list } = this.subjectComments
        if (!list.length) return FROZEN_ARRAY

        return list
          .filter(item => item.comment.includes(title))
          .map(item => mapSelectedComment(item, item.comment, item.action))
      }

      if (this.topicId) {
        const { list } = this.topicComments
        if (!list.length) return FROZEN_ARRAY

        return list
          .filter(item => getPlainText(item.message).includes(title))
          .map(item => mapSelectedComment(item, item.message, item.floor))
      }

      if (this.monoId) {
        const { list } = this.monoComments
        if (!list.length) return FROZEN_ARRAY

        return list
          .filter(item => getPlainText(item.message).includes(title))
          .map(item => mapSelectedComment(item, item.message, item.floor))
      }
    } catch {}

    return FROZEN_ARRAY
  }

  /** 分词数据 */
  @computed get data() {
    if (this.userId) {
      return (
        this.state.user[this.userId] || {
          list: [],
          _loaded: 0
        }
      )
    }

    return this.state.data
  }
}
