/*
 * @Author: czy0729
 * @Date: 2022-11-08 18:16:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 18:19:32
 */
import { MonoId, Navigation } from '@types'
import Store from './store'

export type Ctx = {
  $: InstanceType<typeof Store>
  navigation?: Navigation
}

export type Params = {
  monoId?: MonoId
}
