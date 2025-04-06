/*
 * @Author: czy0729
 * @Date: 2024-04-02 11:01:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-06 19:36:53
 */
import { Fn } from '@types'

export type PickItem = Partial<{
  asks: number
  bids: number
  bonus: number
  change: number
  current: number
  end: number
  fluctuation: any
  icon: any
  id: number
  lastOrder: string
  level: number
  listedDate: string
  marketValue: number
  monoId: number
  name: string
  rank: number
  rate: number
  sacrifices: number
  starForces: number
  stars: number
  state: number
  total: number
  users: any
  assets: number
  userAmount: number
}>

export type Props = {
  title?: string
  visible?: boolean
  leftItem?: PickItem
  rightItemId?: number
  rightItem?: PickItem
  onClose?: Fn
  onSubmit?: Fn
}

export type State = {
  leftItem: PickItem
  leftValue: string
  leftFilter: string
  rightItem: PickItem
  rightValue: string
  rightFilter: string
  search: PickItem[]
  loading: boolean
  title: string
  amount: number
  isTemple: boolean
  focus: boolean
}
