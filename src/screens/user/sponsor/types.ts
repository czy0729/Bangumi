/*
 * @Author: czy0729
 * @Date: 2023-01-07 17:25:42
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-01-07 17:25:42
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
