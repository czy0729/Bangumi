/*
 * @Author: czy0729
 * @Date: 2022-10-28 21:44:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-21 16:06:19
 */
import type { Loaded, Override } from '@types'
import type { INIT_CHARACTERS_ITEM } from './init'

export type ListKey =
  | 'mvc'
  | 'mrc'
  | 'mfc'
  | 'mvi'
  | 'mpi'
  | 'rai'
  | 'mri'
  | 'recent'
  | 'tnbc'
  | 'nbc'
  | 'msrc'
  | 'bid'
  | 'asks'
  | 'auction'

export type Characters = typeof INIT_CHARACTERS_ITEM & {
  assets?: number
  state?: number
  _loaded: Loaded
}

export type MyTemple = {
  avatar: string
  id: number
  cover: string
  name: string
  nickname: string
  level: number
  assets: number
  sacrifices: number
  userStarForces: number
  refine: number
  lastActive: string
  _loaded: Loaded
}

export type TinygrailItemsItem = {
  id: number
  name: string
  icon: string
  line: string
  amount: number
  last: string
}

export type TinygrailTopWeekHistoryItem = {
  assets: number
  avatar: string
  extra: number
  id: number
  level: number
  name: string
  price: number
  rank: number
  sacrifices: number
  type: number
}

export type TinygrailTopWeekItem = Override<
  TinygrailTopWeekHistoryItem,
  {
    extraChange?: number
    rankChange?: number | 'new'
    typeChange?: number
  }
>

export type TinygrailStarLogsItem = {
  amount: number
  fromMonoId: number
  icon: string
  id: number
  monoId: number
  name: string
  oldRank: number
  rank: number
  stars: number
  time: string
  type: number
  userId: number
  userName: string
}
