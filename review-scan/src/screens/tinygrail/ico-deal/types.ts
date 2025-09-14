/*
 * @Author: czy0729
 * @Date: 2022-11-08 18:16:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 18:19:32
 */
import { MonoId, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = {
  monoId?: MonoId
}
