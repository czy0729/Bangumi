/*
 * @Author: czy0729
 * @Date: 2022-09-01 12:15:04
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-01 12:15:04
 */
import type { WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
