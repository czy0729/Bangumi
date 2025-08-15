/*
 * @Author: czy0729
 * @Date: 2022-09-01 14:37:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 16:21:44
 */
import { WithNavigation } from '@types'
import Store from './store'
import { FILTER_KEY_DS, FILTER_TYPE_DS, FILTER_YEAR_DS, TYPE_DS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type TypeType = (typeof TYPE_DS)[number]['key']

export type TypeLabel = (typeof TYPE_DS)[number]['title']

export type FilterType = (typeof FILTER_TYPE_DS)[number]

export type FilterYear = (typeof FILTER_YEAR_DS)[number]

export type FilterKey = (typeof FILTER_KEY_DS)[number][0]
