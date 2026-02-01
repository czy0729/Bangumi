/*
 * @Author: czy0729
 * @Date: 2023-01-07 17:25:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-01 10:14:57
 */
import type { WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
