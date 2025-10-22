/*
 * @Author: czy0729
 * @Date: 2024-08-10 23:06:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-22 01:15:13
 */
import type { WithIndex, WithItem } from '@types'
import type { ListItem } from '../../types'

export type Props = WithIndex<WithItem<ListItem>>
