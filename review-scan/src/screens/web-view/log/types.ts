/*
 * @Author: czy0729
 * @Date: 2025-02-19 07:55:25
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-02-19 07:55:25
 */
import { Loaded, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Stats = {
  a: number[]
  _loaded: Loaded
}
