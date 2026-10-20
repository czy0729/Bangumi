/*
 * @Author: czy0729
 * @Date: 2024-09-19 22:36:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-07 04:26:18
 *
 * 条目封面一览页面交互: 类型筛选与滚动
 */
import { updateVisibleBottom } from '@utils'
import Computed from './computed'

export default class Action extends Computed {
  /** 选择类型筛选 */
  onFilter = (value: string) => {
    this.setState({
      filter: value
    })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
