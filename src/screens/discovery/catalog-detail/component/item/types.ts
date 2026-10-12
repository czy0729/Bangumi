/*
 * @Author: czy0729
 * @Date: 2024-08-10 23:06:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 条目参数
 */
import type { WithIndex, WithItem } from '@types'
import type { ListItem } from '../../types'

export type Props = WithIndex<WithItem<ListItem>>
