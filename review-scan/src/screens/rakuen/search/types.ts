/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:37:42
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-29 17:37:42
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
