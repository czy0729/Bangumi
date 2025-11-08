/*
 * @Author: czy0729
 * @Date: 2024-07-20 09:31:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-05 00:04:43
 */
import type { WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
