/*
 * @Author: czy0729
 * @Date: 2022-11-08 05:49:15
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-08 05:49:15
 */
import type Store from './store'

import type { WithNavigation } from '@types'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
