/*
 * @Author: czy0729
 * @Date: 2022-09-11 02:44:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-11 02:57:32
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = {
  _tags?: string[]
}
