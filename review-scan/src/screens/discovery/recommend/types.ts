/*
 * @Author: czy0729
 * @Date: 2023-05-24 11:53:04
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-05-24 11:53:04
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
