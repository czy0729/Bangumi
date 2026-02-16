/*
 * @Author: czy0729
 * @Date: 2024-08-07 22:06:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 19:45:59
 */
import { computed } from 'mobx'
import { rakuenStore, subjectStore, usersStore, userStore } from '@stores'
import { HTMLDecode } from '@utils'
import { FROZEN_ARRAY } from '@constants'
import { CoverCrt, SubjectId } from '@types'
import { MAX_PAGE, PAGE_LIMIT } from '../ds'
import { CollectionsV0Item, SelectedCommentItem, SnapshotId, TrendId } from '../types'
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
    if (this.subjectId || this.topicId || this.monoId) return ''
    return this.params.userId || userStore.myId || ''
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
    try {
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
    } catch (error) {}

    return FROZEN_ARRAY
  }

  /** 参与计算的用户收藏 */
  @computed get collections(): readonly CollectionsV0Item[] {
    try {
      if (this.state.fetchingCollections) return FROZEN_ARRAY

      return this.state.collections[`${this.userId}|${this.state.subjectType}`] || FROZEN_ARRAY
    } catch (error) {}

    return FROZEN_ARRAY
  }

  /** 当前收藏条目集 */
  @computed get subjectIds(): readonly SubjectId[] {
    try {
      return this.collections.map(item => item.id)
    } catch (error) {}

    return FROZEN_ARRAY
  }

  /** 当前收藏条目集 */
  @computed get subjectIdsWithYear(): readonly SubjectId[] {
    try {
      const year = this.state.year.split(' (')?.[0] || ''
      return year
        ? this.collections.filter(item => item.time?.indexOf(year) === 0).map(item => item.id)
        : this.subjectIds
    } catch (error) {}

    return FROZEN_ARRAY
  }

  /** 点击词云后选中的条目 */
  @computed get selectedSubjects(): readonly CollectionsV0Item[] {
    try {
      const { title } = this.state
      if (!title) return FROZEN_ARRAY

      if (this.userId) {
        if (!this.collections.length) return FROZEN_ARRAY

        const { cutType } = this.state
        const year = this.state.year.split(' (')?.[0] || ''
        return this.collections
          .filter(item => {
            if (year && item.time?.indexOf(year) !== 0) return false

            const subject = this.state.subjects[item.id]
            if (!subject?.id) return false

            if (cutType === '标签') {
              return subject.tags?.some(i => title === i.name)
            } else if (cutType === '制作人员') {
              let { subCutType } = this.state
              subCutType = subCutType.split(' (')?.[0] || ''
              return subject.staff?.some(i => {
                if (subCutType) {
                  return subCutType === i.desc && (title === i.name || title === i.nameJP)
                }
                return title === i.name || title === i.nameJP
              })
            } else if (cutType === '声优') {
              return subject.character?.some(i => title === i.desc)
            } else if (cutType === '排名') {
              const { rank } = subject
              if (title === 'N/A') return !rank
              if (title === '前百') return rank && rank <= 100
              if (title.includes('百')) return title === `${Math.floor(rank / 100)}百`
              if (title.includes('千')) return title === `${Math.floor(rank / 1000)}千`
            }

            return false
          })
          .sort((a, b) => b.time.localeCompare(a.time))
      }
    } catch (error) {}

    return FROZEN_ARRAY
  }

  /** 点击词云后选中的角色 */
  @computed get selectedMono(): {
    id?: number
    name?: string
    nameJP?: string
    image?: CoverCrt<'g'> | ''
    desc?: string
    actorId?: number
  } {
    try {
      const { title, cutType } = this.state
      if (
        !title ||
        (cutType !== '制作人员' && cutType !== '声优') ||
        !this.selectedSubjects.length
      ) {
        return null
      }

      const subjectId = this.selectedSubjects?.[0]?.id
      if (!subjectId) return null

      const subject = this.state.subjects[subjectId]
      if (!subject?.id) return null

      if (cutType === '制作人员') {
        return subject.staff.find(item => title === item.name || title === item.nameJP)
      } else if (cutType === '声优') {
        const item = subject.character.find(item => title === item.desc)
        if (item) {
          return {
            actorId: item.actorId
          }
        }
      }
    } catch (error) {}

    return null
  }

  /** 收藏年份 */
  @computed get years(): readonly string[] {
    try {
      if (this.state.fetchingCollections || !this.subjectIds.length) return FROZEN_ARRAY

      const data: Record<string, number> = {}
      this.collections.forEach(item => {
        const year = item.time.split('-')?.[0]
        if (year && year.length === 4) {
          if (!data[year]) {
            data[year] = 1
          } else {
            data[year] += 1
          }
        }
      })

      return Object.entries(data)
        .sort((a, b) => b[0].localeCompare(a[0]))
        .map(([key, value]) => `${key} (${value})`)
    } catch (error) {}

    return FROZEN_ARRAY
  }

  /** 细分职位, 分词二级类型 */
  @computed get positions(): readonly string[] {
    try {
      if (this.state.fetchingCollections || !this.subjectIdsWithYear.length) return FROZEN_ARRAY

      if (this.state.cutType !== '制作人员') return FROZEN_ARRAY

      const { subjects } = this.state
      const data: Record<string, number> = {}
      const memo: Record<string, 1> = {}
      this.subjectIdsWithYear.forEach(item => {
        const subject = subjects[item]
        if (!subject?.id) return

        if (subject?.staff?.length) {
          subject.staff.forEach(i => {
            const name = i.desc
            if (name) {
              const unique = `${name}|${i.nameJP || i.name}`
              if (!data[name]) {
                data[name] = 1
                memo[unique] = 1
              } else if (!memo[unique]) {
                data[name] += 1
              }
            }
          })
        }
      })

      return Object.entries(data)
        .sort((a, b) => b[1] - a[1])
        .map(([key, value]) => `${key} (${value})`)
    } catch (error) {}

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

  @computed get hm() {
    return [this.url, 'WordCloud']
  }
}
