/*
 * @Author: czy0729
 * @Date: 2019-07-13 01:59:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-21 19:54:14
 */
import {
  LIST_EMPTY,
  MODEL_RAKUEN_SCOPE,
  MODEL_RAKUEN_SCROLL_DIRECTION,
  MODEL_RAKUEN_TYPE
} from '@constants'
import { Avatar, Loaded, RakuenScope, RakuenScrollDirection, RakuenType } from '@types'
import { BlockedUsersItem, PrivacyValue } from './types'

export const NAMESPACE = 'Rakuen'

export const LIMIT_LIST_COMMENTS = 20

export const DEFAULT_SCOPE = MODEL_RAKUEN_SCOPE.getValue<RakuenScope>('全局聚合')

export const DEFAULT_TYPE = MODEL_RAKUEN_TYPE.getValue<RakuenType>('全部')

export const INIT_RAKUEN_ITEM = {
  group: '', // 小组名称
  groupHref: '', // 小组地址
  avatar: '', // 作者头像
  userId: '', // 作者 Id
  userName: '', // 作者名字
  title: '', // 超展开标题
  href: '', // 链接
  replies: '', // 回复数
  time: '' // 发帖时间
}

export const INIT_READED_ITEM = {
  replies: 0, // 帖子查看时的回复数
  time: 0, // 帖子查看时间
  _time: 0 // 帖子查看时间, 需要多一个来缓存上一次点击事件, 用于制造页面内标记新楼层效果
}

/** 帖子内容 */
export const INIT_TOPIC = {
  avatar: '' as Avatar<'s'>,
  floor: '',
  formhash: '',
  likeType: '',
  group: '',
  groupHref: '',
  groupThumb: '',
  lastview: '',
  message: '',
  time: '',
  title: '',
  userId: '',
  userName: '',
  userSign: '',
  tip: '',
  close: '',
  delete: false
}

export const INIT_COMMENTS_ITEM = {
  avatar: '',
  floor: '',
  id: '',
  replySub: '',
  time: '',
  userId: '',
  userName: '',
  userSign: '',
  erase: ''
}

export const INIT_NOTIFY = {
  unread: 0,
  clearHref: '',
  list: [],

  /** @deprecated */
  clearHTML: ''
}

export const INIT_SETTING = {
  /** 楼层正文链接显示成信息块 */
  matchLink: true,

  /** 楼层正文内容猜测条目 */
  acSearch: true,

  /** 猜测条目点击显示 Popable */
  acSearchPopable: true,

  /** 帖子展开引用 */
  quote: true,

  /** 帖子展开引用时, 尝试寻找用户名的头像 */
  quoteAvatar: true,

  /** 楼层是否使用宽模式显示内容 */
  wide: false,

  /** 子楼层折叠 */
  subExpand: '4',

  /** 显示贴贴模块 */
  likes: true,

  /** 是否交换回复跳转按钮 */
  switchSlider: false,

  /** 是否启用楼层跳转滚动动画 */
  sliderAnimated: true,

  /** 是否屏蔽默认头像用户帖子 */
  isBlockDefaultUser: false,

  /** 自定义屏蔽关键字 string[] */
  blockKeywords: [],

  /** 屏蔽的小组 string[] */
  blockGroups: [],

  /** 屏蔽的用户 `${userName}@${userId}`[] */
  blockUserIds: [],

  /** 过滤用户删除的楼层 */
  filterDelete: true,

  /** 标记坟贴 */
  isMarkOldTopic: true,

  /** 子楼层折叠 */
  subFloorExpand: 2,

  /** 自动加载楼层中的图片 */
  autoLoadImage: false,

  /** 帖子楼层滚动导航条方向 */
  scrollDirection: MODEL_RAKUEN_SCROLL_DIRECTION.getValue<RakuenScrollDirection>('右侧')
}

export const INIT_GROUP_INFO = {
  title: '', // 小组名字
  cover: '', // 小组封面
  content: '', // 小组介绍
  create: '', // 创建于
  joinUrl: '', // 加入小组
  byeUrl: '' // 退出小组
}

export const INIT_GROUP_ITEM = {
  list: []
}

export const INIT_BLOG = {
  avatar: '', // 作者头像
  floor: '', // 楼层
  formhash: '', // 回复表单凭据
  message: '', // 帖子内容
  time: '', // 发帖时间
  title: '', // 帖子标题
  userId: '', // 作者Id
  userName: '', // 作者名称
  userSign: '', // 作者签名
  related: [] // 关联条目
}

export const INIT_MINE_ITEM = {
  id: '', // 小组id
  cover: '', // 封面
  name: '', // 名字
  num: '' // 成员数
}

const STATE = {
  /** 超展开列表 */
  rakuen: {
    0: LIST_EMPTY
  },

  /** 帖子历史查看信息 */
  readed: {
    0: INIT_READED_ITEM
  },

  /** 帖子内容 */
  topic: {
    0: INIT_TOPIC
  },

  /** 帖子回复表情 */
  likes: {
    0: {}
  },

  /** @deprecated 帖子内容CDN自维护数据 (用于帖子首次渲染加速) */
  topicFormCDN: {
    0: INIT_TOPIC
  },

  /** 云端帖子内容 */
  cloudTopic: {
    0: INIT_TOPIC
  },

  /** 电波提醒 */
  notify: INIT_NOTIFY,

  /** 超展开设置 */
  setting: INIT_SETTING,

  /** @deprecated 是否本地收藏 */
  favor: {
    0: false
  },

  /** 收藏 v2 */
  favorV2: {
    0: false
  },

  /** 收藏人数 v2 */
  favorCount: {
    0: 0
  },

  /** 小组帖子列表 */
  group: {
    0: INIT_GROUP_ITEM
  },

  /** 小组信息 */
  groupInfo: {
    0: INIT_GROUP_INFO
  },

  /** 小组缩略图缓存 */
  groupThumb: {
    0: ''
  },

  /** 我的小组 */
  mine: LIST_EMPTY,

  /** 日志内容 */
  blog: {
    0: INIT_TOPIC
  },

  /** 日志回复 */
  blogComments: {
    0: LIST_EMPTY
  },

  /** 用户历史超展开帖子 (CDN) */
  userTopicsFormCDN: {
    0: LIST_EMPTY
  },

  /** 条目帖子列表 */
  board: {
    0: LIST_EMPTY
  },

  /** 条目讨论版 */
  reviews: {
    0: LIST_EMPTY
  },

  /** 超展开热门 */
  hot: LIST_EMPTY,

  /** 屏蔽用户的屏蔽次数追踪 */
  blockedUsersTrack: {
    0: 0
  },

  /**
   * 消息与提醒
   * @doc https://bgm.tv/settings/privacy */
  privacy: {
    /** 接收短信 */
    'privacy_set[1]': '0' as PrivacyValue,

    /** 时间线回复 */
    'privacy_set[30]': '0' as PrivacyValue,

    /** @ 提醒 */
    'privacy_set[20]': '0' as PrivacyValue,

    /** 评论提醒 */
    'privacy_set[21]': '0' as PrivacyValue
  },

  /** 用户绝交 */
  blockedUsers: {
    list: [] as BlockedUsersItem[],
    _loaded: 0 as Loaded
  },

  /** 表单授权 */
  formhash: ''
}

/**
 * comments 根据 id 最后 2 位拆开 100 个 key 存放
 * 避免 JSON.stringify 后长度太长, 无法本地化
 * 也能减少每次写入本地储存的量
 * @date 2023-03-24
 */
for (let i = 0; i < 100; i += 1) {
  /** 帖子回复 */
  STATE[`comments${i}`] = {
    0: LIST_EMPTY
  }
}

export { STATE }

export const LOADED = {
  blockedUsers: false,
  blockedUsersTrack: false,
  blog: false,
  cloudTopic: false,
  comments: false,
  favor: false,
  favorCount: false,
  favorV2: false,
  formhash: false,
  groupInfo: false,
  groupThumb: false,
  hot: false,
  likes: false,
  mine: false,
  notify: false,
  privacy: false,
  rakuen: false,
  readed: false,
  setting: false,
  topic: false
}
