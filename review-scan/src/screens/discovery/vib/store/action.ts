/*
 * @Author: czy0729
 * @Date: 2024-12-02 10:09:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 10:10:13
 */
import { updateVisibleBottom } from '@utils'
import State from './state'

export default class Action extends State {
  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
