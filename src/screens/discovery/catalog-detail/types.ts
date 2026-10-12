/*
 * @Author: czy0729
 * @Date: 2022-08-26 14:15:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 页面上下文与类型
 */
import type {
  CatalogDetailBlogItem,
  CatalogDetailEpItem,
  CatalogDetailItem,
  CatalogDetailMonoItem,
  CatalogDetailTopicItem
} from '@stores/discovery/types'
import type { Subject } from '@stores/subject/types'
import type { GetRouteParams, Override, RouteCatalogDetail, WithNavigation } from '@types'
import type Store from './store'
import type { COLLECT_DS, LAYOUT_DS, SORT_DS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteCatalogDetail>

export type Layout = (typeof LAYOUT_DS)[number]['key']

export type Sort = (typeof SORT_DS)[number]['key']

export type Collect = (typeof COLLECT_DS)[number]['key']

export type ListItem = Override<
  CatalogDetailItem,
  {
    score?: number | string
    rank?: number | string
    total?: number | string
  }
>

export type List = ListItem[]

/** 列表条目 (随所选类型切换) */
export type ListData =
  | ListItem
  | CatalogDetailMonoItem
  | CatalogDetailTopicItem
  | CatalogDetailEpItem
  | CatalogDetailBlogItem

/** 条目云缓存 (OSS) 数据: 只保证列表用到的字段存在 */
export type SubjectFromOSS = Partial<Pick<Subject, 'rating' | 'type' | 'titleLabel'>> & {
  /** 排名 (OSS 里无排名存的是空字符串) */
  rank?: number | string

  /** 缓存写入时间 */
  ts?: number
}
