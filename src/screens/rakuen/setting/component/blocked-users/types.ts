/*
 * @Author: czy0729
 * @Date: 2024-12-25 15:20:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 00:27:54
 */
import type { UserId } from '@types'

export type Props = {
  /** 点击记录时的导航回调 (当前仅跳转用户空间) */
  onNavigate?: (path: 'Zone', params: { userId: UserId }) => void
}
