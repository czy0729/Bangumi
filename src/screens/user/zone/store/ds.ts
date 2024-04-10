/*
 * @Author: czy0729
 * @Date: 2021-11-30 02:04:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-09 16:03:35
 */
import { INIT_USERS } from '@stores/users/init'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  /** 各种状态动画缩略折叠 */
  expand: {
    在看: true,
    看过: false,
    想看: false,
    搁置: false,
    抛弃: false
  },

  /** 是否显示历史头像模态框 */
  visible: false,

  /** 是否查询历史帖子超时 */
  timeout: false,

  /** 是否显示用户原始 Id */
  originUid: false,

  /** 是否置顶头部 */
  fixed: false,

  /** 云端快照 */
  users: {
    ...INIT_USERS,
    _loaded: false
  },

  remarkModalVisible: false,
  remarkModalInput: '',

  /** 当前页面实例是否在路由栈中 */
  mounted: true
}

export const STATE = {
  /** Tabs index */
  page: 0,

  /** 是否最近活跃，用于判断是否显示该用户自定义头像和背景 */
  recent: {},

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
