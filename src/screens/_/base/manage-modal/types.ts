/*
 * @Author: czy0729
 * @Date: 2022-06-14 15:39:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-23 16:51:29
 */
import { RatingStatus, SubjectId } from '@types'

export type Props = {
  visible?: boolean
  subjectId?: SubjectId
  title?: string
  desc?: string
  action?: '看' | '玩' | '听' | '读'
  status: '' | RatingStatus
  onSubmit?: (item: {
    subjectId: SubjectId
    rating: number
    tags: string
    status: RatingStatus | ''
    privacy: 0 | 1 | '0' | '1'
    comment: string
  }) => any
  onClose?: () => any
}

export type State = Partial<{
  focus: boolean
  loading: boolean
  fetching: boolean
  rating: number
  tags: string
  showTags: boolean
  comment: string
  commentHistory: string[]
  status: '' | RatingStatus
  privacy: any
}>
