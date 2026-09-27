/*
 * @Author: czy0729
 * @Date: 2024-08-27 10:18:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-09 06:27:50
 */
import { updateVisibleBottom } from '@utils'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 筛选职位 (存职位标题, 计数由 filters 实时计算) */
  onFilterSelect = (title: string) => {
    this.setState({
      position: title
    })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
