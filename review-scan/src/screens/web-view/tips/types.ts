/*
 * @Author: czy0729
 * @Date: 2023-06-23 14:19:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-13 07:06:42
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = {
  key?: string
}
