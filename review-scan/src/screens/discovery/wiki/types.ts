/*
 * @Author: czy0729
 * @Date: 2022-08-27 21:08:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-04 07:31:16
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type TopIndex = 0 | 1 | 2

export type TypeIndex = 0 | 1 | 2 | 3 | 4 | 5

export type RelationIndex = 0 | 1 | 2

export type LastIndex = 0 | 1 | 2 | 3 | 4 | 5
