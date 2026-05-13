/*
 * @Author: czy0729
 * @Date: 2022-11-07 13:55:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 07:55:07
 */
import type { GetRouteParams, RouteTinygrail, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteTinygrail>

export type Bonus = {
  Amount: number
  Cover: string
  CurrentPrice: number
  FinancePrice: number
  Id: number
  Level: number
  Name: string
  Rate: number
  SellAmount: number
  SellPrice: number
}[]
