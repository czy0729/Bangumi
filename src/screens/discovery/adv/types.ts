/*
 * @Author: czy0729
 * @Date: 2022-08-28 15:37:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-30 22:43:06
 */
import type { Query } from '@utils/subject/adv/types'
import type { WithNavigation } from '@types'
import type { FILTER_DS } from './ds'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

/** 找 Gal 筛选条件 (subject Query + 页面本地维度) */
export type ScreenQuery = Query & {
  /** 收藏筛选 (页面本地维度, 不参与 search) */
  collected: string
}

/** 筛选维度 */
export type FilterType = (typeof FILTER_DS)[number]['type']
