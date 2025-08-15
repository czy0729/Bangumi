/*
 * @Author: czy0729
 * @Date: 2022-11-08 17:45:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 08:42:12
 */
import { WithNavigation } from '@types'
import Store from './store'
import { TABS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type TabsKey = (typeof TABS)[number]['key']
