/*
 * @Author: czy0729
 * @Date: 2019-07-13 01:59:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-26 22:41:38
 */
import {
  MODEL_RAKUEN_SCOPE,
  MODEL_RAKUEN_TYPE,
  MODEL_RAKUEN_SCROLL_DIRECTION
} from '@constants/model'

export const NAMESPACE = 'Rakuen'
export const LIMIT_LIST_COMMENTS = 20

// -------------------- default --------------------
export const DEFAULT_SCOPE = MODEL_RAKUEN_SCOPE.getValue('全局聚合')
export const DEFAULT_TYPE = MODEL_RAKUEN_TYPE.getValue('全部')

// -------------------- init --------------------
export const INIT_RAKUEN_ITEM = {
  group: '', // 小组名称
  groupHref: '', // 小组地址
  avatar: '', // 作者头像
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

export const INIT_TOPIC = {
  avatar: '', // 作者头像
  floor: '', // 楼层
  formhash: '', // 回复表单凭据
  group: '', // 小组名称
  groupHref: '', // 小组地址
  groupThumb: '', // 小组图片
  lastview: '', // 回复表单时间戳
  message: '', // 帖子内容
  time: '', // 发帖时间
  title: '', // 帖子标题
  userId: '', // 作者Id
  userName: '', // 作者名称
  userSign: '', // 作者签名
  tip: '', // 存在即代表需要加入小组才能回复
  close: '' // 存在即代表主题被关闭
}

export const INIT_COMMENTS_ITEM = {
  avatar: '', // 用户头像
  floor: '', // 楼层
  id: '', // 楼层id
  replySub: '', // 回复参数
  time: '', // 发帖时间
  userId: '', // 用户Id
  userName: '', // 用户名称
  userSign: '', // 用户签名
  erase: '' // 删除的链接
}

export const INIT_NOTIFY = {
  unread: 0,
  clearHref: '',
  list: []
}

export const INIT_SETTING = {
  quote: true, // 帖子展开引用,
  isBlockDefaultUser: false, // 是否屏蔽默认头像用户帖子
  blockGroups: [], // 屏蔽的小组
  blockUserIds: [], // 屏蔽的用户 `${userName}@${userId}`
  filterDelete: true, // 过滤用户删除的楼层
  isMarkOldTopic: true, // 标记坟贴
  scrollDirection: MODEL_RAKUEN_SCROLL_DIRECTION.getValue('右侧') // 帖子楼层滚动导航条方向
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
