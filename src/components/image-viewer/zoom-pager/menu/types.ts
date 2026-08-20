/*
 * @Author: czy0729
 * @Date: 2026-08-19 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-19 20:04:33
 */
import type { PagerStyles, Props as PagerProps } from '../types'

/** 长按菜单参数 */
export type Props = Pick<PagerProps, 'menus' | 'menuContext'> & {
  /** pager 动态样式 */
  pagerStyles: PagerStyles

  /** 关闭菜单 */
  handleLeaveMenu: () => void

  /** 保存到本地 */
  handleSaveToLocal: () => void
}
