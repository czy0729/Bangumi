/*
 * @Author: czy0729
 * @Date: 2026-08-31 16:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 16:00:00
 *
 * 评分月刊列表的纯函数: 分块摊平为单层列表
 */
import { asc } from '@utils'

import type { Data, ItemNew, ItemTrend } from '../../types'
import type { FlatItem } from './types'

/**
 * 摊平当前期的分块为单层列表: 每块插入一条 header 项, 条目 key 以块号为前缀避免跨块重复
 *
 * @param blocks 当前期分块数据
 */
export function getFlatList(blocks: Data[number]['data']): FlatItem[] {
  const list: FlatItem[] = []

  blocks.forEach((block, blockIndex) => {
    list.push({
      type: 'header',
      key: `header-${blockIndex}`,
      title: block.title
    })

    // 第 0 块 BlockNew 按 value1 数值升序, 拷贝排序避免原地突变
    const blockData = blockIndex
      ? block.data
      : ([...block.data] as ItemNew[]).sort((a, b) => asc(Number(a.value1), Number(b.value1)))

    blockData.forEach((item, itemIndex) => {
      list.push(
        blockIndex
          ? {
              type: 'trend',
              key: `${blockIndex}-${item.id}`,
              item: item as ItemTrend,
              index: itemIndex
            }
          : {
              type: 'new',
              key: `${blockIndex}-${item.id}`,
              item: item as ItemNew,
              index: itemIndex
            }
      )
    })
  })

  return list
}
