/*
 * @Author: czy0729
 * @Date: 2021-03-05 16:47:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-08 15:19:32
 */
import {
  SORT_CCJZ,
  SORT_CGS,
  SORT_DJ,
  SORT_DQJ,
  SORT_FHL,
  SORT_GDZC,
  SORT_PM,
  SORT_SSGX,
  SORT_SSSJ,
  SORT_SSZGX,
  SORT_XJB,
  SORT_XX,
  SORT_XZL
} from '@tinygrail/_/utils'

export const COMPONENT = 'TinygrailCharaAssets'

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
  SORT_CGS,
  SORT_GDZC,
  SORT_SSZGX,

  SORT_DJ,
  SORT_XX,
  SORT_XZL,
  SORT_PM,
  SORT_DQJ,
  SORT_SSGX,
  SORT_XJB,
  SORT_FHL,
  SORT_SSSJ,

  SORT_CCJZ
] as const

export const PER_BATCH_COUNT = 50
