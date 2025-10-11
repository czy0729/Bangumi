/*
 * @Author: czy0729
 * @Date: 2024-10-24 20:16:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-06 17:25:40
 */
import { Loaded } from '@types'
import { COMPONENT } from '../ds'
import { BatchAction, Direction } from '../types'

export const NAMESPACE = `Screen${COMPONENT}`

export const EXCLUDE_STATE = {
  /** 是否批量选择中 */
  editing: false as boolean,

  /** 选中的角色 ID */
  editingIds: {},

  /** 批量动作 */
  batchAction: '' as BatchAction,

  /** 道具模态框标题 */
  title: '',

  /** 是否显示道具模态框 */
  visible: false,

  /** 道具模态框当前角色 ID */
  monoId: 0
}

export const STATE = {
  page: 1,
  level: '',
  templeLevel: '',
  sort: '',
  templeSort: '',
  direction: '' as Direction,
  go: '卖出',

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
