/*
 * @Author: czy0729
 * @Date: 2022-08-28 15:37:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 页面上下文与筛选条件类型
 */
import type { Query } from '@utils/subject/game/types'
import type { WithNavigation } from '@types'
import type { filterDS } from './ds'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

/** 找游戏筛选条件 (subject Query + 页面本地维度) */
export type ScreenQuery = Query & {
  /** 收藏筛选 (页面本地维度, 不参与 search) */
  collected: string
}

/** 筛选维度 */
export type FilterType = (typeof filterDS)[number]['type']

export type Params = {
  _tags?: string[] | string
}
