/*
 * @Author: czy0729
 * @Date: 2025-03-04 19:18:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-07 17:53:12
 */
import { factory } from '@utils'
import { Avatar, Navigation, UserId } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type DataItem = {
  id: string
  createTime: string
}

export type DetailItem = {
  userId: UserId
  avatar: Avatar<'l'>
  name: string
  detail: string
  color: string
  monoId: string
  monoIcoId: string
  monoAvatar: string
  monoName: string
  ts: number
}

export type LikesItem = {
  userId: UserId
  avatar: Avatar<'l'>
  name: string
}
