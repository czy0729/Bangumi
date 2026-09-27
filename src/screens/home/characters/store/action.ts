/*
 * @Author: czy0729
 * @Date: 2024-08-24 11:26:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-24 11:27:30
 */
import { updateVisibleBottom } from '@utils'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 筛选角色定位 (存定位标题, 计数由 filters 实时计算) */
  onFilterSelect = (title: string) => {
    this.setState({
      position: title
    })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
