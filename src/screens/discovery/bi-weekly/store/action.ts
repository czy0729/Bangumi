/*
 * @Author: czy0729
 * @Date: 2024-09-19 22:36:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-19 22:47:27
 */
import { updateVisibleBottom } from '@utils'
import State from './state'

export default class Action extends State {
  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
