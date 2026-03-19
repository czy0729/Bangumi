/*
 * @Author: czy0729
 * @Date: 2022-08-31 15:21:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 03:07:43
 */
import type { Props } from './types'

/** 统一封装尝试滚动到顶 */
export function scrollToTopCallback({ scrollTo, scrollToIndex, scrollToLocation }: Props) {
  if (scrollTo) {
    try {
      scrollTo({
        x: 0,
        y: 0,
        animated: true
      })
    } catch {}
    return
  }

  if (scrollToIndex || scrollToLocation) {
    try {
      scrollToIndex({
        animated: true,
        index: 0,
        viewOffset: 8000
      })
    } catch {
      try {
        scrollToLocation({
          animated: true,
          itemIndex: 0,
          sectionIndex: 0,
          viewOffset: 800,
          viewPosition: 0
        })
      } catch {}
    }
  }
}
