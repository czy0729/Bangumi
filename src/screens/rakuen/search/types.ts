/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:37:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 */
import type { WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
