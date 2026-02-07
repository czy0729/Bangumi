/*
 * @Author: czy0729
 * @Date: 2025-07-17 13:09:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 10:19:20
 */
import type { UserId, WithNavigation } from '@types'
import type Store from './store'

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

export type UserStatus = Record<UserId, boolean>
