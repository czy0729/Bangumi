/*
 * @Author: czy0729
 * @Date: 2024-08-07 22:06:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-28 21:25:04
 */
import { computed } from 'mobx'
import { rakuenStore, subjectStore } from '@stores'
import { HTMLDecode, removeHTMLTag } from '@utils'
import { FROZEN_ARRAY } from '@constants'
import { Id, UserId } from '@types'
import { MAX_PAGE, PAGE_LIMIT } from '../ds'
import State from './state'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class Computed extends State {
  /** 本地化 */
  save = () => {
    return this.saveStorage(this.namespace, EXCLUDE_STATE)
  }

  /** 条目 ID */
  @computed get subjectId() {
    return this.params.subjectId
  }

  /** 帖子 ID */
  @computed get topicId() {
    return this.params.topicId
  }

  /** 角色 ID */
  @computed get monoId() {
    return this.params.monoId
  }

  @computed get id() {
    return this.subjectId || this.topicId || this.monoId || ''
  }

  /** 快照 ID */
  @computed get snapshotId() {
    return `extract_${this.id}`.replace(/\//g, '_')
  }

  /** 页面唯一命名空间 */
  @computed get namespace() {
    return `${NAMESPACE}|${this.id}`
  }

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

  /** 吐槽纯文本 */
  @computed get plainText() {
    let text = ''

    if (this.subjectId) {
      this.subjectComments.list.forEach((item, index) => {
        if (index >= MAX_PAGE * PAGE_LIMIT) return

        text += HTMLDecode(item.comment)
      })
    } else if (this.topicId) {
      text += HTMLDecode(this.topic.title)
      text += HTMLDecode(removeHTMLTag(this.topic.message, false)).slice(0, 300)
      this.topicComments.list.forEach((item, index) => {
        if (index >= 200) return

        text += HTMLDecode(removeHTMLTag(item.message, false))
          .split('[来自Bangumi')[0]
          .slice(0, 150)
      })
    } else if (this.monoId) {
      this.monoComments.list.forEach((item, index) => {
        if (index >= MAX_PAGE * PAGE_LIMIT) return

        text += HTMLDecode(removeHTMLTag(item.message, false))
      })
    }

    return text.replace(/x[a-zA-Z0-9]{5}/g, '').replace(/&#;/g, '')
  }

  /** 点击词云后选中的吐槽 */
  @computed get selectedComment(): readonly {
    id: Id
    avatar: string
    userId: UserId
    userName: string
    comment: string
    time: string
    action?: string
  }[] {
    const { title } = this.state
    if (this.subjectId) {
      const { list } = this.subjectComments
      if (!list.length) return FROZEN_ARRAY

      return list
        .filter(item => item.comment.includes(title))
        .map(item => ({
          id: item.id,
          avatar: item.avatar,
          userId: item.userId,
          userName: HTMLDecode(item.userName),
          comment: HTMLDecode(item.comment),
          time: item.time,
          action: item.action
        }))
    }

    if (this.topicId) {
      const { list } = this.topicComments
      if (!list.length) return FROZEN_ARRAY

      return list
        .filter(item => removeHTMLTag(item.message, false).includes(title))
        .map(item => ({
          id: item.id,
          avatar: item.avatar,
          userId: item.userId,
          userName: HTMLDecode(item.userName),
          comment: HTMLDecode(
            removeHTMLTag(item.message, false)
              .split('[来自Bangumi')[0]
              .replace(/x[a-zA-Z0-9]{5}/g, '')
              .replace(/&#;/g, '')
          ),
          time: item.time,
          action: item.floor
        }))
    }

    if (this.monoId) {
      const { list } = this.monoComments
      if (!list.length) return FROZEN_ARRAY

      return list
        .filter(item => removeHTMLTag(item.message, false).includes(title))
        .map(item => ({
          id: item.id,
          avatar: item.avatar,
          userId: item.userId,
          userName: HTMLDecode(item.userName),
          comment: HTMLDecode(
            removeHTMLTag(item.message, false)
              .replace(/x[a-zA-Z0-9]{5}/g, '')
              .replace(/&#;/g, '')
          ),
          time: item.time,
          action: item.floor
        }))
    }

    return FROZEN_ARRAY
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
      this.subject?.name_cn ||
      this.subject?.name ||
      this.topic?.title ||
      this.mono?.nameCn ||
      this.mono?.name ||
      ''
    )
  }
}
