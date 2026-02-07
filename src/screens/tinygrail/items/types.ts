/*
 * @Author: czy0729
 * @Date: 2022-11-08 16:31:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 07:47:00
 */
import type { ITEMS_TYPE } from '@tinygrail/_/characters-modal'
import type { Id, Navigation } from '@types'
import type Store from './store'

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
