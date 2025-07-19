/*
 * @Author: czy0729
 * @Date: 2022-11-07 13:55:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-04 18:04:32
 */
import { Navigation } from '@types'
import Store from './store'

export type Ctx = {
  $: InstanceType<typeof Store>
  navigation?: Navigation
}

export type Params = {
  fromBottomTab?: boolean
}

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
