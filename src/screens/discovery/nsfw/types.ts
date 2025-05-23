/*
 * @Author: czy0729
 * @Date: 2024-07-20 09:31:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-20 11:21:56
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
