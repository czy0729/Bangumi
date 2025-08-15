/*
 * @Author: czy0729
 * @Date: 2025-07-17 13:09:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-17 15:17:54
 */
import { UserId, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Detail = {
  price: number
  total: number
  list: [number, string, string, number, number, number][]
  user: {
    username: UserId
    nickname: string
    avatar: string
  }
}

export type Sort = '' | 'amount' | 'percent'
