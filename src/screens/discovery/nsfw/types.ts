/*
 * @Author: czy0729
 * @Date: 2024-07-20 09:31:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-02 05:11:28
 */
import type { Query } from '@utils/subject/nsfw/types'
import type { WithNavigation } from '@types'
import type Store from './store'
import type { filterDS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

/** 找 NSFW 筛选条件 (subject Query + 页面本地维度) */
export type ScreenQuery = Query & {
  /** 收藏筛选 (页面本地维度, 不参与 search) */
  collected: string
}

/** 筛选维度 */
export type FilterType = (typeof filterDS)[number]['type']
