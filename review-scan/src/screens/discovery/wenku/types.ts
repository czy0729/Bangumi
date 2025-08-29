/*
 * @Author: czy0729
 * @Date: 2022-09-12 15:41:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-06 04:14:08
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = {
  _tags?: string[] | string
}
