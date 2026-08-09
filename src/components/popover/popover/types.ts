/*
 * @Author: czy0729
 * @Date: 2024-09-02 12:22:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-09
 */
export type PopoverIOSItems = {
  text: string
  onPress?: (evt?: { pageX?: number; pageY?: number }) => void
  isTitle?: boolean
}[]
