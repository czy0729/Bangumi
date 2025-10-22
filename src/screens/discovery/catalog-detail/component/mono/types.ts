/*
 * @Author: czy0729
 * @Date: 2025-01-08 05:46:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-22 10:30:36
 */
import type { CatalogDetailMonoItem } from '@stores/discovery/types'
import type { WithIndex, WithItem } from '@types'

export type Props = WithIndex<WithItem<CatalogDetailMonoItem>>
