/*
 * @Author: czy0729
 * @Date: 2022-09-29 16:44:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 17:21:33
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
