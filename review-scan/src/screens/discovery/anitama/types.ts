/*
 * @Author: czy0729
 * @Date: 2022-09-01 12:15:04
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-01 12:15:04
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
