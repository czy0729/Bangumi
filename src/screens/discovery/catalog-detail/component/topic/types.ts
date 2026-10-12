/*
 * @Author: czy0729
 * @Date: 2025-01-08 05:46:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 小组条目参数
 */
import type { CatalogDetailTopicItem } from '@stores/discovery/types'
import type { WithIndex, WithItem } from '@types'

export type Props = WithIndex<WithItem<CatalogDetailTopicItem>>
