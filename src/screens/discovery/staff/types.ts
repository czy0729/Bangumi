/*
 * @Author: czy0729
 * @Date: 2022-08-26 13:49:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 01:32:34
 */
import type { WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
