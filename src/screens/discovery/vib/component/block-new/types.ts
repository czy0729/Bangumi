/*
 * @Author: czy0729
 * @Date: 2024-05-04 05:47:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 14:07:20
 */
import type { WithViewStyles } from '@types'
import type { ItemNew } from '../../types'

export type Props = WithViewStyles<{
  title: string
  data: ItemNew[]
}>
