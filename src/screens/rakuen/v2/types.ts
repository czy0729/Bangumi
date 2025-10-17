/*
 * @Author: czy0729
 * @Date: 2022-09-03 04:36:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-17 23:44:52
 */
import type { WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
