/*
 * @Author: czy0729
 * @Date: 2021-03-05 16:47:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 04:02:56
 */
import {
  SORT_CCJZ,
  SORT_CGS,
  SORT_DJ,
  SORT_DQJ,
  SORT_DQZD,
  SORT_FHL,
  SORT_GDZC,
  SORT_GX,
  SORT_HYD,
  SORT_RK,
  SORT_SC,
  SORT_SCJ,
  SORT_SSGX,
  SORT_SSZGX,
  SORT_XFJL,
  SORT_XX,
  SORT_ZGX
} from '@tinygrail/_/utils'
import { Loaded } from '@types'
import { Direction } from './types'

export const NAMESPACE = 'ScreenTinygrailCharaAssets'

export const TABS = [
  {
    title: '总览',
    key: 'merge'
  },
  {
    title: '人物',
    key: 'chara'
  },
  {
    title: '圣殿',
    key: 'temple'
  },
  {
    title: 'ICO',
    key: 'ico'
  }
] as const

export const SORT_DS = [
  SORT_SC,
  SORT_GX,
  SORT_ZGX,
  SORT_SSGX,
  SORT_SSZGX,
  SORT_CGS,
  SORT_GDZC,
  SORT_RK,
  SORT_XX,
  SORT_DQJ,
  SORT_HYD,
  SORT_DJ,
  SORT_SCJ,
  SORT_DQZD,
  SORT_CCJZ,
  SORT_XFJL,
  SORT_FHL
] as const

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

export const PER_BATCH_COUNT = 10
