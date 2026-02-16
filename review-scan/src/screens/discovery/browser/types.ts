/*
 * @Author: czy0729
 * @Date: 2022-07-26 22:56:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 05:29:21
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
