/*
 * @Author: czy0729
 * @Date: 2025-10-20 10:14:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-20 12:15:54
 */
import type { HomeItem } from '@stores/calendar/types'
import type { SubjectType, ViewStyle, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  index: number
  type?: SubjectType
}>

export type MainProps = WithViewStyles<{
  styles: ViewStyle
  index: number
  type: SubjectType
  list: HomeItem[]
}>
