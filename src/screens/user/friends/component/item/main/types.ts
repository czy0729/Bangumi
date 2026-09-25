/*
 * @Author: czy0729
 * @Date: 2026-05-21 01:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-21 01:30:00
 */
import type { Props as ContentProps } from '../content/types'

export type Props = ContentProps & {
  /** 长按菜单项, null 为不启用菜单 */
  menuData: readonly string[] | null

  /** 头像点击 */
  onPress: () => void

  /** 菜单项选择 */
  onSelect: (title?: string) => void
}
