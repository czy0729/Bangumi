/*
 * @Author: czy0729
 * @Date: 2025-10-20 13:23:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-20 13:24:52
 */
import type { MenuItem } from '@types'

export type Props = {
  /** 更新菜单配置 */
  setMenu: (menu: MenuItem['key'][]) => void

  /** 取消编辑 */
  onCancel: () => void

  /** 保存菜单配置 */
  onSave: () => void
}
