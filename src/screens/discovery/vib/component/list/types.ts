/*
 * @Author: czy0729
 * @Date: 2026-08-31 16:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 16:00:00
 *
 * 评分月刊列表的类型定义
 */
import type { ScrollEvent } from '@types'
import type { Data, HandleForwardRef, ItemNew, ItemTrend } from '../../types'

/**
 * 摊平后的单层列表项
 *  - header: 分块标题
 *  - new: 新增表条目 (第 0 块, 按 value1 数值升序)
 *  - trend: 趋势表条目
 */
export type FlatItem =
  | {
      type: 'header'

      /** 全局唯一 key */
      key: string

      /** 分块标题 */
      title: string
    }
  | {
      type: 'new'

      /** 全局唯一 key */
      key: string

      /** 条目数据 */
      item: ItemNew

      /** 块内序号 (用于排名显示) */
      index: number
    }
  | {
      type: 'trend'

      /** 全局唯一 key */
      key: string

      /** 条目数据 */
      item: ItemTrend

      /** 块内序号 (用于排名显示) */
      index: number
    }

export type Props = {
  /** 各期数据 */
  data: Data

  /** 当前期下标 */
  index: number

  /** 收集长列表的 ref */
  forwardRef: HandleForwardRef

  /** 切期回调 */
  onSelect: (index: number) => void

  /** 滚动回调 */
  onScroll: (event: ScrollEvent) => void
}
