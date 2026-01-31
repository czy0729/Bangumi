/*
 * @Author: czy0729
 * @Date: 2022-08-14 07:00:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-18 16:49:13
 */
import type { WithNavigation } from '@types'
import type Store from './store'
import type { TABS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type TabLabel = (typeof TABS)[number]['title']
