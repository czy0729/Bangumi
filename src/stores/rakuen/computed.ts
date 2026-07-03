/*
 * @Author: czy0729
 * @Date: 2023-04-24 14:24:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-17 23:30:50
 */
import { computed } from 'mobx'
import { desc } from '@utils'
import { computedFn } from '@utils/computed-fn'
import { LIST_EMPTY } from '@constants'
import { DEFAULT_SCOPE, DEFAULT_TYPE, INIT_GROUP_INFO, INIT_READED_ITEM, INIT_TOPIC } from './init'
import { getInt } from './utils'
import State from './state'

import type {
  BlogId,
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
import type { STATE } from './init'
import type {
  Blog,
  Board,
  Comments,
  Group,
  Likes,
  Mine,
  Rakuen,
  Readed,
  Reviews,
  Topic,
  UserTopicsFromCDN
} from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  // -------------------- 纯计算 (直接 computedFn) --------------------
  /** @deprecated 帖子内容 CDN 自维护数据 (用于帖子首次渲染加速) */
  topicFormCDN = computedFn((topicId: TopicId) => {
    return (this.state.topicFormCDN[topicId] || INIT_TOPIC) as Topic
  })

  /** 小组帖子列表 */
  group = computedFn((groupId: Id, page: number = 1) => {
    const ITEM_KEY = `${groupId}|${page}` as const
    return (this.state.group[ITEM_KEY] || LIST_EMPTY) as Group
  })

  /** 日志回复 */
  blogComments = computedFn((blogId: Id) => {
    return (this.state.blogComments[blogId] || LIST_EMPTY) as Comments
  })

  /** 用户历史超展开帖子 */
  userTopicsFromCDN = computedFn((userId: UserId) => {
    return (this.state.userTopicsFromCDN[userId] || LIST_EMPTY) as UserTopicsFromCDN
  })

  /** 条目帖子 */
  board = computedFn((subjectId: SubjectId) => {
    return (this.state.board[subjectId] || LIST_EMPTY) as Board
  })

  /** 条目讨论版 */
  reviews = computedFn((subjectId: SubjectId) => {
    return (this.state.reviews[subjectId] || LIST_EMPTY) as Reviews
  })

  /** @deprecated 日志内容 (CDN) */
  blogFormCDN = computedFn(() => {
    return INIT_TOPIC
  })

  /** 帖子回复表情 */
  likesList = computedFn((topicId: TopicId | BlogId | SubjectId, floorId: string | number) => {
    const likes = this.likes(topicId)?.[floorId]
    if (!likes) return null

    return Object.entries(likes)
      .sort((a, b) => desc(Number(a[1]?.total || 0), Number(b[1]?.total || 0)))
      .map(item => item[1])
  })

  /** 已存书签 */
  bookmarksSaved = computedFn((href: string) => {
    if (!href) return false
    return !!this.bookmarks.find(item => item.href === href)
  })

  /** 是否已追踪用户 */
  commentTracked = computedFn((userName: UserId) => {
    return this.setting.commentTrack.includes(userName)
  })

  // -------------------- 有副作用 (分离 init + computedFn) --------------------
  /** 超展开列表 */
  private _rakuen = computedFn(
    (scope = DEFAULT_SCOPE, type: RakuenType | RakuenTypeMono | RakuenTypeGroup = DEFAULT_TYPE) => {
      const ITEM_KEY = `${scope}|${type}` as const
      return (this.state.rakuen[ITEM_KEY] || LIST_EMPTY) as Rakuen
    }
  )

  /** 帖子历史查看信息 */
  private _readed = computedFn((topicId: TopicId) => {
    return (this.state.readed[topicId] || INIT_READED_ITEM) as Readed
  })

  /** 帖子内容 */
  private _topic = computedFn((topicId: TopicId) => {
    return (this.state.topic[topicId] || INIT_TOPIC) as Topic
  })

  /** 帖子回复表情 */
  private _likes = computedFn((topicId: TopicId | BlogId | SubjectId) => {
    return (this.state.likes[topicId] || {}) as Likes
  })

  /** 帖子回复, 合并 comments 0-999 */
  private _comments = computedFn((topicId: TopicId) => {
    const last = getInt(topicId)
    const STATE_KEY = `comments${last}` as const
    return (this.state?.[STATE_KEY]?.[topicId] || LIST_EMPTY) as Comments
  })

  /** 云端帖子内容 */
  private _cloudTopic = computedFn((topicId: TopicId) => {
    return (this.state.cloudTopic[topicId] || INIT_TOPIC) as Topic
  })

  /** 是否本地收藏 */
  private _favor = computedFn((topicId: TopicId) => {
    return this.state.favor[topicId] || false
  })

  /** 小组信息 */
  private _groupInfo = computedFn((groupId: Id) => {
    return this.state.groupInfo[groupId] || INIT_GROUP_INFO
  })

  /** 小组缩略图缓存 */
  private _groupThumb = computedFn((name: string) => {
    return (this.state.groupThumb[name] || '') as CoverGroup<'l'>
  })

  /** 日志内容 */
  private _blog = computedFn((blogId: Id) => {
    return (this.state.blog[blogId] || INIT_TOPIC) as Blog
  })

  /** 收藏 v2 */
  private _favorV2 = computedFn((topicId: TopicId | `blog/${Id}`) => {
    return this.state.favorV2[topicId] || false
  })

  /** 收藏人数 v2 */
  private _favorCount = computedFn((topicId: TopicId | `blog/${Id}`) => {
    return this.state.favorCount[topicId] || 0
  })

  /** 屏蔽用户的屏蔽次数追踪 */
  private _blockedUsersTrack = computedFn((userId: UserId) => {
    return this.state.blockedUsersTrack[userId] || 0
  })

  /** 屏蔽关键字的屏蔽次数追踪 */
  private _blockedTrack = computedFn((keyword: string) => {
    return this.state.blockedTrack[keyword] || 0
  })

  /** @deprecated 所有收藏条目状态 */
  @computed get notify() {
    this.init('notify', true)
    return this.state.notify
  }

  /** 超展开设置 */
  @computed get setting() {
    this.init('setting', true)
    return this.state.setting
  }

  /** 我的小组 */
  @computed get mine() {
    this.init('mine', true)
    return (this.state.mine || LIST_EMPTY) as Mine
  }

  /** 超展开热门 */
  @computed get hot() {
    this.init('hot', true)
    return (this.state.hot || LIST_EMPTY) as Rakuen
  }

  /** 消息与提醒 */
  @computed get privacy() {
    this.init('privacy', true)
    return this.state.privacy
  }

  /** 用户绝交 */
  @computed get blockedUsers() {
    this.init('blockedUsers', true)
    return this.state.blockedUsers
  }

  /** 用户书签 */
  @computed get bookmarks() {
    this.init('bookmarks', true)
    return this.state.bookmarks
  }

  /** 表单授权 */
  @computed get formhash() {
    this.init('formhash', true)
    return this.state.formhash
  }

  /** 收藏的帖子 */
  @computed get favorTopic() {
    this.init('favor', true)
    this.init('topic', true)
    this.init('cloudTopic', true)

    const { favor, topic, cloudTopic } = this.state
    const data = {
      ...cloudTopic,
      _favor: favor
    }

    Object.keys(topic)
      .filter(topicId => {
        // 不知道哪里有问题, 有时会出现 undefined 的 key 值, 过滤掉
        if (!topicId.includes('group/') || topicId.includes('undefined')) return false
        return this.favor(topicId as TopicId)
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

  /** 绝交用户 ID, 替代旧的 rakuenStore.setting.blockUserIds */
  @computed get blockUserIds() {
    const { list } = this.state.blockedUsers
    return list.map(item => `${item.userName}@${item.userId}`)
  }

  // -------------------- 导出方法 (分离 init) --------------------
  /** 超展开列表 */
  rakuen(
    scope = DEFAULT_SCOPE,
    type: RakuenType | RakuenTypeMono | RakuenTypeGroup = DEFAULT_TYPE
  ) {
    this.init('rakuen', true)
    return this._rakuen(scope, type)
  }

  /** 帖子历史查看信息 */
  readed(topicId: TopicId) {
    this.init('readed', true)
    return this._readed(topicId)
  }

  /** 帖子内容 */
  topic(topicId: TopicId) {
    this.init('topic', true)
    return this._topic(topicId)
  }

  /** 帖子回复表情 */
  likes(topicId: TopicId | BlogId | SubjectId) {
    this.init('likes', true)
    return this._likes(topicId)
  }

  /** 帖子回复, 合并 comments 0-999 */
  comments(topicId: TopicId) {
    const last = getInt(topicId)
    this.init(`comments${last}`, true)
    return this._comments(topicId)
  }

  /** 云端帖子内容 */
  cloudTopic(topicId: TopicId) {
    this.init('cloudTopic', true)
    return this._cloudTopic(topicId)
  }

  /** 是否本地收藏 */
  favor(topicId: TopicId) {
    this.init('favor', true)
    return this._favor(topicId)
  }

  /** 小组信息 */
  groupInfo(groupId: Id) {
    this.init('groupInfo', true)
    return this._groupInfo(groupId)
  }

  /** 小组缩略图缓存 */
  groupThumb(name: string) {
    this.init('groupThumb', true)
    return this._groupThumb(name)
  }

  /** 日志内容 */
  blog(blogId: Id) {
    this.init('blog', true)
    return this._blog(blogId)
  }

  /** 收藏 v2 */
  favorV2(topicId: TopicId | `blog/${Id}`) {
    this.init('favorV2', true)
    return this._favorV2(topicId)
  }

  /** 收藏人数 v2 */
  favorCount(topicId: TopicId | `blog/${Id}`) {
    this.init('favorCount', true)
    return this._favorCount(topicId)
  }

  /** 屏蔽用户的屏蔽次数追踪 */
  blockedUsersTrack(userId: UserId) {
    this.init('blockedUsersTrack', true)
    return this._blockedUsersTrack(userId)
  }

  /** 屏蔽关键字的屏蔽次数追踪 */
  blockedTrack(keyword: string) {
    this.init('blockedTrack', true)
    return this._blockedTrack(keyword)
  }
}
