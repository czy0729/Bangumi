/*
 * @Author: czy0729
 * @Date: 2022-11-08 05:31:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 05:31:36
 */
import type { AnyObject, Fn, Id, MonoId, SubjectId } from '@types'

export type Props = AnyObject & {
  monoId?: MonoId
  id?: Id
  withoutFeedback?: boolean
  showStatus?: boolean
  onAuctionCancel?: Fn
  _subjectId?: SubjectId
  _relation?: any[]
}
