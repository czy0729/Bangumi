/*
 * @Author: czy0729
 * @Date: 2022-11-08 05:31:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 04:12:42
 */
import type { EventType, Id, MonoId, SubjectId } from '@types'

export type Props = {
  monoId?: MonoId
  id?: Id

  /** 项类型, 'auction' 为竞拍项 */
  type?: string

  /** 竞拍状态: 1 成功, 2 失败 */
  state?: number

  /** 有值代表是 ICO 项 (结束时间) */
  end?: string
  event?: EventType
  withoutFeedback?: boolean
  showMenu?: boolean
  showStatus?: boolean
  onAuctionCancel?: (id: Id) => void
  _subject?: any
  _subjectId?: SubjectId
  _relation?: any[]
}
