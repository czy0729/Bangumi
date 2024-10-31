/*
 * @Author: czy0729
 * @Date: 2023-12-17 06:54:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-21 05:26:49
 */
import { Id, Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
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
  ota: {},

  showHeaderTitle: false
}

export const STATE = {
  /** 展开的子楼层 ID */
  expands: [],

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
