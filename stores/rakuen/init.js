/*
 * @Author: czy0729
 * @Date: 2019-07-13 01:59:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-15 20:02:10
 */
import { MODEL_RAKUEN_SCOPE, MODEL_RAKUEN_TYPE } from '@constants/model'

export const NAMESPACE = 'Rakuen'
export const LIST_COMMENTS_LIMIT = 20

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
  userSign: '' // 作者签名
}

export const INIT_COMMENTS_ITEM = {
  avatar: '', // 用户头像
  floor: '', // 楼层
  id: '', // 楼层id
  replySub: '', // 回复参数
  time: '', // 发帖时间
  userId: '', // 用户Id
  userName: '', // 用户名称
  userSign: '' // 用户签名
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
  blockUserIds: [] // 屏蔽的用户 `${userName}@${userId}`
}

export const INIT_GROUP_INFO = {
  title: '',
  cover: '',
  content: ''
}

export const INIT_GROUP_ITEM = {
  list: []
}
