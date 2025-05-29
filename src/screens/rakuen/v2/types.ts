/*
 * @Author: czy0729
 * @Date: 2022-09-03 04:36:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-23 08:09:54
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
