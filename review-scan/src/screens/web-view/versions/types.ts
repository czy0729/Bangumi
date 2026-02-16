/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:43:44
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-06-10 05:43:44
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
