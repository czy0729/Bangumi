/*
 * @Author: czy0729
 * @Date: 2023-04-24 14:24:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-06 13:52:50
 */
import { computed } from 'mobx'
import { desc } from '@utils'
import { LIST_EMPTY } from '@constants'
import {
  CoverGroup,
  Id,
  RakuenType,
  RakuenTypeGroup,
  RakuenTypeMono,
  StoreConstructor,
  SubjectId,
  TopicId,
  UserId
} from '@types'
import {
  DEFAULT_SCOPE,
  DEFAULT_TYPE,
  INIT_GROUP_INFO,
  INIT_GROUP_ITEM,
  INIT_READED_ITEM,
  INIT_TOPIC,
  STATE
} from './init'
import { getInt } from './utils'
import State from './state'
import {
  Board,
  Comments,
  Group,
  GroupInfo,
  Likes,
  Mine,
  Notify,
  Rakuen,
  Readed,
  Reviews,
  Topic,
  UserTopicsFormCDN
} from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  /** 超展开列表 */
  rakuen(
    scope = DEFAULT_SCOPE,
    type: RakuenType | RakuenTypeMono | RakuenTypeGroup = DEFAULT_TYPE
  ) {
    this.init('rakuen')
    return computed<Rakuen>(() => {
      const key = `${scope}|${type}`
      return this.state.rakuen[key] || LIST_EMPTY
    }).get()
  }

  /** 帖子历史查看信息 */
  readed(topicId: TopicId) {
    this.init('readed')
    return computed<Readed>(() => {
      return this.state.readed[topicId] || INIT_READED_ITEM
    }).get()
  }

  /** 帖子内容 */
  topic(topicId: TopicId) {
    this.init('topic')
    return computed<Topic>(() => {
      return this.state.topic[topicId] || INIT_TOPIC
    }).get()
  }

  /** 帖子回复表情 */
  likes(topicId: string | number) {
    this.init('likes')
    return computed<Likes>(() => {
      return this.state.likes[topicId] || {}
    }).get()
  }

  /** 帖子回复, 合并 comments 0-99 */
  comments(topicId: TopicId) {
    if (!topicId) return LIST_EMPTY

    const last = getInt(topicId)
    const key = `comments${last}` as const
    this.init(key)

    return computed<Comments>(() => {
      return this.state?.[key]?.[topicId] || LIST_EMPTY
    }).get()
  }

  /** @deprecated 帖子内容CDN自维护数据 (用于帖子首次渲染加速) */
  topicFormCDN(topicId: string | number) {
    return computed<Topic>(() => {
      return this.state.topicFormCDN[topicId] || INIT_TOPIC
    }).get()
  }

  /** 云端帖子内容 */
  cloudTopic(topicId: TopicId) {
    this.init('cloudTopic')
    return computed<Topic>(() => {
      return this.state.cloudTopic[topicId] || INIT_TOPIC
    }).get()
  }

  /** 电波提醒 */
  @computed get notify(): Notify {
    this.init('notify')
    return this.state.notify
  }

  /** 超展开设置 */
  @computed get setting() {
    this.init('setting')
    return this.state.setting
  }

  /** 是否本地收藏 */
  favor(topicId: TopicId) {
    this.init('favor')
    return computed<boolean>(() => {
      return this.state.favor[topicId] || false
    }).get()
  }

  /** 小组帖子列表 */
  group(groupId: Id, page: number = 1) {
    return computed<Group>(() => {
      const key = `${groupId}|${page}`
      return this.state.group[key] || INIT_GROUP_ITEM
    }).get()
  }

  /** 小组信息 */
  groupInfo(groupId: Id) {
    this.init('groupInfo')
    return computed<GroupInfo>(() => {
      return this.state.groupInfo[groupId] || INIT_GROUP_INFO
    }).get()
  }

  /** 小组缩略图缓存 */
  groupThumb(name: string) {
    this.init('groupThumb')
    return computed<CoverGroup<'l'>>(() => {
      return this.state.groupThumb[name] || ''
    }).get()
  }

  /** 我的小组 */
  @computed get mine(): Mine {
    this.init('mine')
    return this.state.mine || LIST_EMPTY
  }

  /** 日志内容 */
  blog(blogId: Id) {
    this.init('blog')
    return computed<Topic>(() => {
      return this.state.blog[blogId] || INIT_TOPIC
    }).get()
  }

  /** 日志回复 */
  blogComments(blogId: Id) {
    return computed<Comments>(() => {
      return this.state.blogComments[blogId] || LIST_EMPTY
    }).get()
  }

  /** 用户历史超展开帖子 (CDN) */
  userTopicsFormCDN(userId: UserId) {
    return computed<UserTopicsFormCDN>(() => {
      return this.state.userTopicsFormCDN[userId] || LIST_EMPTY
    }).get()
  }

  /** 条目帖子列表 */
  board(subjectId: SubjectId) {
    return computed<Board>(() => {
      return this.state.board[subjectId] || LIST_EMPTY
    }).get()
  }

  /** 条目讨论版 */
  reviews(subjectId: SubjectId) {
    return computed<Reviews>(() => {
      return this.state.reviews[subjectId] || LIST_EMPTY
    }).get()
  }

  /** 超展开热门 */
  @computed get hot(): Rakuen {
    this.init('hot')
    return this.state.hot || LIST_EMPTY
  }

  /** @deprecated 日志内容 (CDN) */
  blogFormCDN() {
    return INIT_TOPIC
  }

  /** 收藏 v2 */
  favorV2(topicId: TopicId) {
    this.init('favorV2')
    return computed<boolean>(() => {
      return this.state.favorV2[topicId] || false
    }).get()
  }

  /** 收藏人数 v2 */
  favorCount(topicId: TopicId) {
    this.init('favorCount')
    return computed<number>(() => {
      return this.state.favorCount[topicId] || 0
    }).get()
  }

  /** 屏蔽用户的屏蔽次数追踪 */
  blockedUsersTrack(userId: UserId) {
    this.init('blockedUsersTrack')
    return computed<number>(() => {
      return this.state.blockedUsersTrack[userId] || 0
    }).get()
  }

  /** 消息与提醒 */
  @computed get privacy() {
    this.init('privacy')
    return this.state.privacy
  }

  /** 用户绝交 */
  @computed get blockedUsers() {
    this.init('blockedUsers')
    return this.state.blockedUsers
  }

  // -------------------- computed --------------------
  /** 收藏的帖子 */
  @computed get favorTopic() {
    this.init('favor')
    this.init('topic')
    this.init('cloudTopic')

    const { favor, topic, cloudTopic } = this.state
    const data = {
      ...cloudTopic,
      _favor: favor
    }

    Object.keys(topic)
      .filter((topicId: TopicId) => {
        // 不知道哪里有问题, 有时会出现undefined的key值, 过滤掉
        if (!topicId.includes('group/') || topicId.includes('undefined')) return false
        return this.favor(topicId)
      })
      .sort((a, b) => desc(String(b), String(a)))
      .forEach(topicId => {
        const target = topic[topicId] || cloudTopic[topicId]
        if (target) {
          data[topicId] = {
            topicId,
            avatar: target.avatar || '',
            userName: target.userName || '',
            title: target.title || '',
            group: target.group || '',
            time: target.time || '',
            userId: target.userId || 0
          }
        }
      })
    return data
  }

  /** 帖子回复表情 */
  likesList(topicId: string | number, floorId: string | number) {
    return computed(() => {
      const likes = this.likes(topicId)?.[floorId]
      if (!likes) return null

      return Object.entries(likes)
        .sort((a, b) => desc(Number(a[1]?.total || 0), Number(b[1]?.total || 0)))
        .map(item => item[1])
    }).get()
  }
}
