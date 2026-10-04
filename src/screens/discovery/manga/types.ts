/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 00:00:00
 */
import type { Query } from '@utils/subject/manga/types'
import type { WithNavigation } from '@types'
import type Store from './store'
import type { filterDS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

/** 找漫画筛选条件 (subject Query + 页面本地维度) */
export type ScreenQuery = Query & {
  /** 收藏筛选 (页面本地维度, 不参与 search) */
  collected: string
}

/** 筛选维度 */
export type FilterType = (typeof filterDS)[number]['type']

/** 路由参数 (条目页第三方标签块跳转携带) */
export type Params = {
  _tags?: string[] | string
}
