/*
 * @Author: czy0729
 * @Date: 2022-08-14 10:22:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-15 04:52:00
 */
import type { WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
