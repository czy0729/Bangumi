/*
 * @Author: czy0729
 * @Date: 2022-11-01 20:41:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 16:11:02
 */
import type { ScrollView } from 'react-native'

export function scrollToX(
  scrollView: ScrollView,
  data: readonly any[],
  value: any,
  width = 50,
  mutiple = false
) {
  setTimeout(() => {
    try {
      if (scrollView && value) {
        let index = 0
        if (mutiple) {
          // 多组数据时取第一个命中的选中项
          data.some(items => {
            const idx = items.findIndex((i: any) => String(i) === String(value))
            if (idx !== -1) {
              index = idx
              return true
            }
            return false
          })
        } else {
          index = data.findIndex(i => String(i) === String(value))
        }

        if (index >= 4) {
          setTimeout(() => {
            scrollView.scrollTo(
              {
                x: (index - 2) * width,
                y: 0,
                animated: true
              },
              1
            )
          }, 80)
        }
      }
    } catch {}
  }, 160)
}
