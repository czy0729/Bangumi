/*
 * @Author: czy0729
 * @Date: 2025-09-21 19:58:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 *
 * 书籍章节进度编辑
 */
import type { HandleScrollIntoViewIfNeeded } from '../../../types'

export type Props = {
  onScrollIntoViewIfNeeded: HandleScrollIntoViewIfNeeded
}

/** 单个输入框块 (Chap / Vol 复用) */
export type InputBlockParams = {
  /** 标签文案 */
  label: string

  /** 当前值 */
  value: string | number

  /** 占位值 */
  placeholder: string | number

  /** 显示在输入框右侧的总数 */
  total?: string | number

  /** 用于计算进度条百分比的总数 */
  totalNumber?: string | number

  /** 更新类型 */
  type: 'chap' | 'vol'
}
