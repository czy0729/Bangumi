/*
 * @Author: czy0729
 * @Date: 2024-12-06 15:43:47
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-12-06 15:43:47
 */
import { updateVisibleBottom } from '@utils'
import Computed from './computed'

export default class Action extends Computed {
  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
