/*
 * @Author: czy0729
 * @Date: 2023-04-26 15:29:29
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-04-26 15:29:29
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
