/*
 * @Author: czy0729
 * @Date: 2021-03-05 16:47:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-24 20:26:07
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
  SORT_SC,
  SORT_CGS,
  SORT_GDZC,
  SORT_RK,
  SORT_DJ,
  SORT_XX,
  SORT_GX,
  SORT_ZGX,
  SORT_SSGX,
  SORT_SSZGX,
  SORT_DQJ,
  SORT_HYD,
  SORT_SCJ,
  SORT_DQZD,
  SORT_CCJZ,
  SORT_XFJL,
  SORT_FHL
] as const

export const PER_BATCH_COUNT = 50
