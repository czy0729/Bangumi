/*
 * @Author: czy0729
 * @Date: 2024-08-18 04:10:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 04:10:48
 */
import { updateVisibleBottom } from '@utils'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
