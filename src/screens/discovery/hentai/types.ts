/*
 * @Author: czy0729
 * @Date: 2022-09-11 02:44:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 页面上下文与筛选条件类型
 */
import type { Query } from '@utils/subject/hentai/types'
import type { GetRouteParams, RouteHentai, WithNavigation } from '@types'
import type Store from './store'
import type { filterDS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

/** 路由参数 (条目页第三方标签跳转携带) */
export type Params = GetRouteParams<RouteHentai>

/** 找 Hentai 筛选条件 (subject Query + 页面本地维度, 四个标签维度空串为全部) */
export type ScreenQuery = Omit<Query, 'chara' | 'job' | 'body' | 'content'> & {
  /** 人物 */
  chara: string

  /** 职业 */
  job: string

  /** 外貌 */
  body: string

  /** 剧情 */
  content: string

  /** 收藏筛选 (页面本地维度, 不参与 search) */
  collected: string
}

/** 筛选维度 */
export type FilterType = (typeof filterDS)[number]['type']
