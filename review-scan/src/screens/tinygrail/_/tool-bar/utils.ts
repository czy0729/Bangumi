/*
 * @Author: czy0729
 * @Date: 2025-01-10 18:30:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-10 18:33:59
 */
import { ScrollView } from 'react-native'

export function scrollToX(scrollView: ScrollView, data: readonly any[], value: any, width = 52) {
  try {
    if (scrollView && value) {
      const index = data.findIndex(i => i.value == value)
      if (index >= 5) {
        setTimeout(() => {
          try {
            scrollView.scrollTo(
              {
                x: (index - 2) * width,
                y: 0,
                animated: true
              },
              1
            )
          } catch (error) {}
        }, 80)
      }
    }
  } catch (error) {}
}
