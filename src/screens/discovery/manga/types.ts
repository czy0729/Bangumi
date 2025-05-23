/*
 * @Author: czy0729
 * @Date: 2022-09-11 16:37:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-06 04:12:09
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = {
  _tags?: string[] | string
}
