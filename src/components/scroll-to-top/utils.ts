/*
 * @Author: czy0729
 * @Date: 2022-08-31 15:21:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 01:28:10
 */
import { Props } from './types'

/** 统一封装尝试滚动到顶 */
export function scrollToTopCallback({
  scrollTo,
  scrollToIndex,
  scrollToLocation
}: Props) {
  if (scrollTo) {
    try {
      scrollTo({
        x: 0,
        y: 0,
        animated: true
      })
    } catch (error) {
      console.error('ScrollToTop', 'scrollTo', error)
    }
    return
  }

  if (scrollToIndex || scrollToLocation) {
    try {
      scrollToIndex({
        animated: true,
        index: 0,
        viewOffset: 8000
      })
    } catch (error) {
      console.error('ScrollToTop', 'scrollToIndex', String(error))

      try {
        scrollToLocation({
          animated: true,
          itemIndex: 0,
          sectionIndex: 0,
          viewOffset: 800,
          viewPosition: 0
        })
      } catch (ex) {
        console.error('ScrollToTop', 'scrollToLocation', String(ex))
      }
    }
  }
}
