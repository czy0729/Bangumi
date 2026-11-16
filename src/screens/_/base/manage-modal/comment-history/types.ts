/*
 * @Author: czy0729
 * @Date: 2025-10-21 13:32:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-16 06:37:45
 */
export type Props = {
  data: string[]
  onShow: () => Promise<void> | void
  onSelect: (text: string) => void
}
