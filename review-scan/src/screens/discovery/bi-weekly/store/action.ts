/*
 * @Author: czy0729
 * @Date: 2024-09-19 22:36:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 05:07:23
 */
import { updateVisibleBottom } from '@utils'
import { Type } from '../types'
import State from './state'
import { EXCLUDE_STATE } from './ds'

export default class Action extends State {
  /** 切换文章类型 */
  onType = (type: Type) => {
    this.setState({
      type,
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })
    this.save()
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
