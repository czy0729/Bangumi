/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:52:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-08 18:03:59
 */
import { Loaded, UserId, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Balance = Record<UserId, number> & {
  _total?: number
  _lastTotal?: number
  _loaded?: Loaded
}
