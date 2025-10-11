/*
 * @Author: czy0729
 * @Date: 2022-06-17 11:24:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-11 16:00:32
 */
import { CoverProps } from '@components'
import { EventType, Id, SubjectTypeCn, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  num?: number
  id?: Id
  name?: string
  nameCn?: string
  sub?: string
  cover?: CoverProps['src']
  cdn?: boolean
  score?: string | number
  rank?: string | number
  typeCn?: SubjectTypeCn
  collection?: string
  userCollection?: string
  airtime?: string
  aid?: string | number
  wid?: string | number
  mid?: string | number
  isRectangle?: boolean
  hideScore?: boolean
  event?: EventType
}
