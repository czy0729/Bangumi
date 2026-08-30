/*
 * @Author: czy0729
 * @Date: 2026-08-31 06:58:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 07:35:28
 */
import { computed } from 'mobx'
import { rakuenStore, subjectStore, usersStore } from '@stores'
import { MAX_PAGE, PAGE_LIMIT } from '../../ds'
import { getPlainText, removeSlogan, removeSpec } from '../utils'
import Base from './base'

/** 领域数据派生: 各 domain store 代理与文本预处理 */
export default class Meta extends Base {
  /** 条目信息 */
  @computed get subject() {
    return subjectStore.subject(this.subjectId)
  }

  /** 条目吐槽 */
  @computed get subjectComments() {
    return subjectStore.subjectComments(this.subjectId)
  }

  /** 帖子信息 */
  @computed get topic() {
    return rakuenStore.topic(this.topicId)
  }

  /** 帖子回复 */
  @computed get topicComments() {
    return rakuenStore.comments(this.topicId)
  }

  /** 角色信息 */
  @computed get mono() {
    return subjectStore.mono(this.monoId)
  }

  /** 角色回复 */
  @computed get monoComments() {
    return subjectStore.monoComments(this.monoId)
  }

  /** 用户信息 */
  @computed get users() {
    return usersStore.users(this.userId)
  }

  /** 吐槽纯文本 */
  @computed get plainText() {
    let text = ''
    if (this.subjectId) {
      const limit = MAX_PAGE * PAGE_LIMIT
      this.subjectComments.list.forEach((item, index) => {
        if (index >= limit) return

        text += removeSlogan(getPlainText(item.comment))
      })
    }

    if (this.topicId) {
      text += getPlainText(this.topic.title)
      text += getPlainText(this.topic.message, 300)

      const limit = 200
      this.topicComments.list.forEach((item, index) => {
        if (index >= limit) return

        text += removeSlogan(getPlainText(item.message), 150)
      })
    }

    if (this.monoId) {
      const limit = MAX_PAGE * PAGE_LIMIT
      this.monoComments.list.forEach((item, index) => {
        if (index >= limit) return

        text += removeSlogan(getPlainText(item.message), 150)
      })
    }

    return removeSpec(text)
  }

  /** 总楼层数 */
  @computed get total() {
    let sum = 0
    this.topicComments.list.forEach(item => {
      sum += 1 + item.sub.length
    })
    return sum
  }

  /** 标题 */
  @computed get title() {
    return (
      (this.userId
        ? this.users?.userName
        : this.subject?.name_cn ||
          this.subject?.name ||
          this.topic?.title ||
          this.mono?.nameCn ||
          this.mono?.name ||
          this.users?.userName) || ''
    )
  }
}
