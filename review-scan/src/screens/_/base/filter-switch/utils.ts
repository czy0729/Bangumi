/*
 * @Author: czy0729
 * @Date: 2024-01-14 03:11:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:12:20
 */
import { ScrollView } from 'react-native'
import { getStorage } from '@utils'
import { FILTER_SWITCH_DS, FLITER_SWITCH_LAST_PATH_KEY, PATH_MAP } from './ds'

export async function getLastPath() {
  const path = await getStorage(FLITER_SWITCH_LAST_PATH_KEY)
  return path || PATH_MAP[FILTER_SWITCH_DS[0]]
}

export function scrollToX(scrollView: ScrollView, data: readonly any[], value: any, width = 50) {
  try {
    if (scrollView && value) {
      const index = data.findIndex(i => i == value)
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
