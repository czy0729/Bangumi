/*
 * @Author: czy0729
 * @Date: 2021-11-30 02:04:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-16 07:45:37
 */
import { INIT_USERS } from '@stores/users/init'
import { TIMELINE_TYPE } from '@constants'
import { CompletionItem, Loaded, TimeLineType } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  /** 番剧收藏状态折叠 */
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

  /** 时间线类型 */
  timelineType: TIMELINE_TYPE[0].value as TimeLineType,

  /** 是否显示备注弹窗 */
  remarkModalVisible: false,

  /** 备注弹窗输入框 */
  remarkModalInput: '',

  /** 是否显示锐评框 */
  chatModalVisible: false,

  /** 锐评请求中 */
  chatLoading: false,

  /** 当前页面实例是否在路由栈中 */
  mounted: true
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 选项卡索引位置 */
  page: 0,

  /** 是否最近活跃，用于判断是否显示该用户自定义头像和背景 */
  recent: {},

  /** 锐评 */
  chat: {
    bangumi: [] as CompletionItem[],
    burakkuSakura: [] as CompletionItem[],
    miku: [] as CompletionItem[],
    index: -1,
    _loaded: false as Loaded
  },

  /** 成为好友的时间 */
  friendStatus: '',

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
