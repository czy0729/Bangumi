/*
 * @Author: czy0729
 * @Date: 2024-08-07 22:06:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-01 07:04:38
 */
import { computed } from 'mobx'
import { rakuenStore, subjectStore } from '@stores'
import { HTMLDecode } from '@utils'
import { FROZEN_ARRAY } from '@constants'
import { Id, UserId } from '@types'
import { MAX_PAGE, PAGE_LIMIT } from '../ds'
import { SnapshotId, TrendId } from '../types'
import { getPlainText, removeSlogan, removeSpec } from './utils'
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
  @computed get snapshotId(): SnapshotId {
    return `extract_${String(this.id).replace(/\//g, '_')}`
  }

  /** 趋势 ID */
  @computed get trendId(): TrendId {
    return `trend_${String(this.id).replace(/\//g, '_')}`
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
          comment: removeSlogan(getPlainText(item.comment)),
          time: item.time,
          action: item.action
        }))
    }

    if (this.topicId) {
      const { list } = this.topicComments
      if (!list.length) return FROZEN_ARRAY

      return list
        .filter(item => getPlainText(item.message).includes(title))
        .map(item => ({
          id: item.id,
          avatar: item.avatar,
          userId: item.userId,
          userName: HTMLDecode(item.userName),
          comment: removeSlogan(getPlainText(item.message)),
          time: item.time,
          action: item.floor
        }))
    }

    if (this.monoId) {
      const { list } = this.monoComments
      if (!list.length) return FROZEN_ARRAY

      return list
        .filter(item => getPlainText(item.message).includes(title))
        .map(item => ({
          id: item.id,
          avatar: item.avatar,
          userId: item.userId,
          userName: HTMLDecode(item.userName),
          comment: removeSlogan(getPlainText(item.message)),
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

  /** 浏览器地址 */
  @computed get url() {
    return `word_cloud/${String(this.id).replace(/\//g, '_')}`
  }
}
