/*
 * @Author: czy0729
 * @Date: 2022-10-28 21:44:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-21 16:06:19
 */
import type { Loaded, Override, UserId } from '@types'
import type { INIT_CHARACTERS_ITEM, INIT_RICH } from './init'

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

export type TinygrailRedPacketLogItem = {
  id: number
  userId: number
  relatedName: string
  change: number
  description: string
  logTime: string
  type: number
  state: number
}

/** 番市首富排序 */
export type RichSort = keyof typeof INIT_RICH

/** 小圣杯角色项 (持仓 / 圣殿 / 全部角色等列表通用) */
export type TinygrailItem = {
  id: number

  /** 以下字段来自接口或解析结果, 可能缺失 */
  amount?: number
  asks?: number
  assets?: number
  bids?: number
  bonus?: number
  change?: number | string
  cLevel?: number
  cover?: string
  crown?: number
  current?: number
  end?: string
  fluctuation?: number | string
  icon?: string
  lastOrder?: string
  level?: number
  listedDate?: string
  marketValue?: number
  monoId?: number
  name?: string
  price?: number
  rank?: number
  rate?: number
  refine?: number
  sacrifices?: number
  starForces?: number
  stars?: number
  state?: number
  subjectId?: number
  subjectName?: string
  total?: number
  userStarForces?: number
  users?: number
  _loaded?: Loaded
}

/** 番市首富用户项 (fetchRich 生成, assets / total / share 为 toFixed 结果) */
export type TinygrailRichItem = {
  avatar: string
  nickname: string
  userId: UserId
  assets: string
  total: string
  share: string
  principal: number
  lastActiveDate: string
  lastIndex: number
  state: number
}
