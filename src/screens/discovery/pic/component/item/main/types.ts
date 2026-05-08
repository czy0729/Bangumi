/*
 * @Author: czy0729
 * @Date: 2026-05-08 20:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-08 21:17:06
 */
export type Props = {
  width: number
  height: number
  data: string[]
  image: string
  onPress: () => void
  onSelect: (item: string) => void
  onError?: () => void
}
