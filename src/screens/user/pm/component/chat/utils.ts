/*
 * @Author: czy0729
 * @Date: 2026-11-03 06:39:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-03 06:39:21
 *
 * 消息列表纯函数
 */
import type { PmDetailItem } from '@stores/user/types'

/**
 * 向上找最近一条消息项 (跳过线程标签项)
 *
 * @param list 消息列表
 * @param index 当前项下标
 */
export function getPrevMessage(list: PmDetailItem[], index: number) {
  for (let i = index - 1; i >= 0; i--) {
    if (list[i].type !== 'label') return list[i]
  }
}
