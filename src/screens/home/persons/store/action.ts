/*
 * @Author: czy0729
 * @Date: 2024-08-27 10:18:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-04 21:21:13
 */
import { updateVisibleBottom } from '@utils'
import Fetch from './fetch'

export default class Action extends Fetch {
  onFilterSelect = (position: string) => {
    this.setState({
      position
    })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
