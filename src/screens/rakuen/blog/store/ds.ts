/*
 * @Author: czy0729
 * @Date: 2023-12-17 06:54:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 11:00:00
 *
 * 页面 Store 状态定义: 持久化 / 瞬态 / 初始值
 */
import { COMPONENT } from '../ds'

import type { Blog } from '@stores/rakuen/types'
import type { CompletionItem, Id, Loaded } from '@types'
import type { ResultData } from '@utils/kv/type'
import type { SnapshotId } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 头部是否固定 */
  fixed: false
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 回复框 placeholder */
  placeholder: '',

  /** 回复框 value */
  value: '',

  /** 存放 bgm 特有的子回复配置字符串 */
  replySub: '',

  /** 若提交回复的时候存在此值, 调用编辑回复逻辑 */
  editPostId: '' as Id,

  /** 存放子回复 html */
  message: '',

  /** 云快照 */
  ota: {} as Record<SnapshotId, ResultData<Blog>>,

  /** 是否显示锐评框 */
  chatModalVisible: false,

  /** 锐评请求中 */
  chatLoading: false,

  showHeaderTitle: false
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 展开的子楼层 ID */
  expands: [] as Id[],

  /** 锐评 */
  chat: {
    bangumi: [] as CompletionItem[],
    burakkuSakura: [] as CompletionItem[],
    miku: [] as CompletionItem[],
    index: -1,
    _loaded: false as Loaded
  },

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
