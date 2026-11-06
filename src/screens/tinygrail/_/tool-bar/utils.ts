/*
 * @Author: czy0729
 * @Date: 2025-01-10 18:30:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 12:00:00
 */
import type { ScrollViewInstance } from 'react-native'
import type { Item } from './types'

/**
 * 让当前排序项滚动到可视区域内
 *
 * @param scrollView 横向滚动的实例
 * @param data 排序选项
 * @param value 当前排序值
 * @param width 单个选项宽度
 */
export function scrollToX(
  scrollView: ScrollViewInstance,
  data: readonly Item[],
  value: unknown,
  width: number = 52
): void {
  try {
    if (scrollView && value) {
      const index = data.findIndex(i => i.value != null && String(i.value) === String(value))
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
          } catch {}
        }, 80)
      }
    }
  } catch {}
}
