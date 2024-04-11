/*
 * @Author: czy0729
 * @Date: 2022-08-07 04:01:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-12 02:55:32
 */
import { factory } from '@utils'
import { Navigation, UserId } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  userId: UserId
}

export type Sort = '' | 'percent' | 'recent'
