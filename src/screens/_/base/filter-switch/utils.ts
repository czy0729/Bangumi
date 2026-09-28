/*
 * @Author: czy0729
 * @Date: 2024-01-14 03:11:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 02:45:07
 */
import { getStorage } from '@utils'
import { FILTER_SWITCH_DS, FLITER_SWITCH_LAST_PATH_KEY, PATH_MAP } from './ds'

import type { Paths } from '@types'
import type { ScrollView } from 'react-native'

/** 上次筛选切换的页面路径 */
export async function getLastPath(): Promise<Paths> {
  const path = (await getStorage(FLITER_SWITCH_LAST_PATH_KEY)) as Paths
  return path || PATH_MAP[FILTER_SWITCH_DS[0]]
}

export function scrollToX(scrollView: ScrollView, data: readonly any[], value: any, width = 50) {
  try {
    if (scrollView && value) {
      const index = data.findIndex(i => i == value)
      if (index >= 4) {
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
          } catch {}
        }, 80)
      }
    }
  } catch {}
}
