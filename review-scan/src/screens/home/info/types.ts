/*
 * @Author: czy0729
 * @Date: 2024-11-07 11:57:38
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-07 11:57:38
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
