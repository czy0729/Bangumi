/*
 * @Author: czy0729
 * @Date: 2024-08-20 14:50:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 页面初始化
 */
import Action from './action'
import { EXCLUDE_STATE } from './ds'

/** 频道页面状态机 */
export default class ScreenChannel extends Action {
  init = () => {
    this.setState({
      ...EXCLUDE_STATE,
      type: this.type
    })

    return this.fetchChannel()
  }
}
