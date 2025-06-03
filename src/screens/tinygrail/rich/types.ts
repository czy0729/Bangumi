/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:52:54
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-11 06:52:54
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
