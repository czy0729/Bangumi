/*
 * @Author: czy0729
 * @Date: 2025-12-11 03:03:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-15 19:02:00
 */
import type { RenderItem } from '@types'
import type { NodeItem } from '../../../types'

export type Props = RenderItem<
  NodeItem,
  {
    relate?: string
  }
>
