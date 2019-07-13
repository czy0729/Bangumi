/*
 * @Author: czy0729
 * @Date: 2019-07-13 01:59:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-13 17:28:16
 */
import { MODEL_RAKUEN_SCOPE, MODEL_RAKUEN_TYPE } from '@constants/model'

export const NAMESPACE = 'Rakuen'
export const LIST_LIMIT_COMMENTS = 20

// -------------------- default --------------------
export const DEFAULT_SCOPE = MODEL_RAKUEN_SCOPE.getValue('全局聚合')
export const DEFAULT_TYPE = MODEL_RAKUEN_TYPE.getValue('全部')

// -------------------- init --------------------
export const INIT_RAKUEN_ITEM = {
  group: '', // 小组名称
  groupHref: '', // 小组地址
  avatar: '', // 作者头像
  title: '', // 超展开标题
  href: '', // 链接
  replies: '', // 回复数
  time: '' // 发帖时间
}

export const INIT_READED_ITEM = {
  time: 0, // 帖子查看时间
  replies: 0 // 帖子查看时的回复数
}

export const INIT_TOPIC = {
  groupThumb: '', // 小组图片
  group: '', // 小组名称
  groupHref: '', // 小组地址
  avatar: '', // 作者头像
  userName: '', // 作者名称
  userId: '', // 作者Id
  userSign: '', // 作者签名
  time: '', // 发帖时间
  title: '', // 帖子标题
  message: '', // 帖子内容
  formhash: '', // 回复表单凭据
  lastview: '' // 回复表单时间戳
}

export const INIT_COMMENTS_ITEM = {}

export const INIT_NOTIFY = {
  unread: 0,
  clearHref: '',
  list: []
}

export const INIT_SETTING = {
  isBlockDefaultUser: true, // 是否屏蔽默认头像用户帖子
  blockGroups: [] // 屏蔽的小组
}
