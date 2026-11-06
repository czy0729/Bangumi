/*
 * @Author: czy0729
 * @Date: 2024-01-14 03:11:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 12:00:00
 */
import { getStorage } from '@utils'
import { FILTER_SWITCH_DS, FLITER_SWITCH_LAST_PATH_KEY, PATH_MAP } from './ds'

import type { ScrollViewInstance } from 'react-native'
import type { Paths } from '@types'

/** 上次筛选切换的页面路径 */
export async function getLastPath(): Promise<Paths> {
  const path = (await getStorage(FLITER_SWITCH_LAST_PATH_KEY)) as Paths
  return path || PATH_MAP[FILTER_SWITCH_DS[0]]
}

/**
 * 让当前选中项滚动到可视区域内
 *
 * @param scrollView 横向滚动的实例
 * @param data 选项数据
 * @param value 当前选中值
 * @param width 单个选项宽度
 */
export function scrollToX(
  scrollView: ScrollViewInstance,
  data: readonly unknown[],
  value: unknown,
  width: number = 50
): void {
  try {
    if (scrollView && value) {
      const index = data.findIndex(i => i != null && String(i) === String(value))
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
