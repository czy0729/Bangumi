/*
 * @Author: czy0729
 * @Date: 2024-08-07 22:06:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-03 06:54:09
 */
import { computed } from 'mobx'
import { collectionStore, rakuenStore, subjectStore, usersStore } from '@stores'
import { UserCollectionsItem } from '@stores/collection/types'
import { HTMLDecode } from '@utils'
import { FROZEN_ARRAY } from '@constants'
import { MAX_PAGE, PAGE_LIMIT } from '../ds'
import { SelectedCommentItem, SnapshotId, TrendId } from '../types'
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

  /** 用户 ID */
  @computed get userId() {
    return this.params.userId
  }

  @computed get id() {
    return this.subjectId || this.topicId || this.monoId || this.userId || ''
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
    return this.userId ? NAMESPACE : `${NAMESPACE}|${this.id}`
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

  /** 点击词云后选中的吐槽 */
  @computed get selectedComment(): readonly SelectedCommentItem[] {
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

  /** 参与计算的用户收藏 */
  @computed get userCollections() {
    const { subjectType } = this.state
    return [
      ...collectionStore.userCollections(this.userId, subjectType, 'wish').list,
      ...collectionStore.userCollections(this.userId, subjectType, 'do').list,
      ...collectionStore.userCollections(this.userId, subjectType, 'collect').list
    ]
  }

  /** 当前收藏条目集 */
  @computed get subjectIds() {
    return this.userCollections.map(item => item.id)
  }

  /** 点击词云后选中的条目 */
  @computed get selectedSubjects(): readonly UserCollectionsItem[] {
    const { title } = this.state
    if (!title) return FROZEN_ARRAY

    if (this.userId) {
      if (!this.userCollections.length) return FROZEN_ARRAY

      const { cutType } = this.state
      return this.userCollections
        .filter(item => {
          const subject = this.state.subjects[item.id]
          if (!subject) return false

          if (cutType === '标签') {
            return subject?.tags?.some(i => title === i.name)
          } else if (cutType === '制作人员') {
            return subject?.staff?.some(i => title === i.name || title === i.nameJP)
          } else if (cutType === '声优') {
            return subject?.character?.some(i => title === i.desc)
          } else if (cutType === '排名') {
            const { rank } = subject
            if (title === 'N/A') return !rank
            if (title === '前百') return rank <= 100
            if (title.includes('百')) return title === `${Math.floor(rank / 100)}百`
            if (title.includes('千')) return title === `${Math.floor(rank / 1000)}千`
          }

          return false
        })
        .sort((a, b) => b.time.localeCompare(a.time))
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
      this.users?.userName ||
      ''
    )
  }

  /** 浏览器地址 */
  @computed get url() {
    return `word_cloud/${String(this.id).replace(/\//g, '_')}`
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
