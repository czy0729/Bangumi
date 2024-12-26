/*
 * @Author: czy0729
 * @Date: 2022-11-08 16:31:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-26 02:06:10
 */
import { factory } from '@utils'
import { ITEMS_TYPE } from '@tinygrail/_/characters-modal'
import { Id, Navigation } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type ItemsKeys = keyof typeof ITEMS_TYPE

export type ItemsType = (typeof ITEMS_TYPE)[keyof typeof ITEMS_TYPE]

export type ItemUseParams = {
  title?: ItemsKeys
  monoId: Id
  toMonoId: Id
  amount: number
  isTemple: boolean
}
