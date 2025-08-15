/*
 * @Author: czy0729
 * @Date: 2022-08-14 10:22:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-15 04:52:00
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
