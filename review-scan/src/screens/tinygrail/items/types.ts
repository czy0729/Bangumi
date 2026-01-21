/*
 * @Author: czy0729
 * @Date: 2022-11-08 16:31:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-02 22:48:09
 */
import { ITEMS_TYPE } from '@tinygrail/_/characters-modal'
import { Id, Navigation } from '@types'
import Store from './store'

export type Ctx = {
  $: InstanceType<typeof Store>
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
