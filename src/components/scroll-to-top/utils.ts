/*
 * @Author: czy0729
 * @Date: 2022-08-31 15:21:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 15:38:53
 */
import { devLogs } from '../dev'
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
      devLogs('ScrollToTop', 'scrollTo', error)
    }
    return
  }

  if (scrollToIndex) {
    try {
      scrollToIndex({
        animated: true,
        index: 0,
        viewOffset: 8000
      })
    } catch (error) {
      devLogs('ScrollToTop', 'scrollToIndex', error)

      try {
        scrollToLocation({
          animated: true,
          itemIndex: 0,
          sectionIndex: 0,
          viewOffset: 800,
          viewPosition: 0
        })
      } catch (ex) {
        devLogs('ScrollToTop', 'scrollToLocation', ex)
      }
    }
  }
}
