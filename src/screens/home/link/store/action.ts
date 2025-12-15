/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:40:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-15 16:49:16
 */
import { updateVisibleBottom } from '@utils'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
