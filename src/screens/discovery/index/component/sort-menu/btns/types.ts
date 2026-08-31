/*
 * @Author: czy0729
 * @Date: 2025-10-20 13:23:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-20 13:24:52
 */
import type { MenuItem } from '@types'

export type Props = {
  setMenu: (menu: MenuItem['key'][]) => void
  onCancel: () => void
  onSave: () => void
}
