/*
 * @Author: czy0729
 * @Date: 2022-08-26 13:49:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 13:49:45
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
