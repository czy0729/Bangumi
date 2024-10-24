/*
 * @Author: czy0729
 * @Date: 2024-10-24 20:16:26
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-10-24 20:16:26
 */
import { Loaded } from '@types'
import { COMPONENT } from '../ds'
import { Direction } from '../types'

export const NAMESPACE = `Screen${COMPONENT}`

export const EXCLUDE_STATE = {
  /** 是否批量选择中 */
  editing: false as boolean,

  /** 选中的角色id */
  editingIds: {},

  /** 批量动作 */
  batchAction: '' as string
}

export const STATE = {
  page: 1,
  level: '',
  sort: '',
  direction: '' as Direction,
  go: '卖出',
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
