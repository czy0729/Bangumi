/*
 * @Author: czy0729
 * @Date: 2026-11-09 05:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 05:00:00
 */
import type { SectionTitleProps } from '@_'
import type { LayoutKey } from '@stores/subject/types'

export type Props = Omit<SectionTitleProps, 'onPress' | 'popover'> & {
  /** 对应板块的布局 key (布局菜单数据与动作由 store 提供) */
  layoutKey: LayoutKey
}
