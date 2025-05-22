/*
 * @Author: czy0729
 * @Date: 2022-08-26 13:49:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 13:49:45
 */
import { Navigation } from '@types'
import Store from './store'

export type Ctx = {
  $: InstanceType<typeof Store>
  navigation?: Navigation
}
