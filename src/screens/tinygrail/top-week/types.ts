/*
 * @Author: czy0729
 * @Date: 2022-11-09 06:39:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-29 16:42:29
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
