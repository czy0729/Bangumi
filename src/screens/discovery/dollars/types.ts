/*
 * @Author: czy0729
 * @Date: 2023-04-26 15:29:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-05 14:24:46
 */
import type { WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
