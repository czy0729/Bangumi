/*
 * @Author: czy0729
 * @Date: 2024-08-21 17:14:13
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-08-21 17:14:13
 */
import { updateVisibleBottom } from '@utils'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchCatalogs(true)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
