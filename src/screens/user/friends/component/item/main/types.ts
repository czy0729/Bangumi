/*
 * @Author: czy0729
 * @Date: 2026-05-21 01:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-21 01:30:00
 */
export type Props = {
  userId: string
  avatar: string
  name: string
  filter: string
  menuData: readonly string[] | null
  onPress: () => void
  onSelect: (title?: string) => void
}
