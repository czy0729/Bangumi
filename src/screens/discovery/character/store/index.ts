/*
 * @Author: czy0729
 * @Date: 2019-09-09 17:38:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 页面初始化与卸载
 */
import Action from './action'
import { RESET_STATE } from './ds'

/** 用户人物页面状态机 */
export default class ScreenCharacter extends Action {
  init = async () => {
    const key = this.id
    if (!this.list(key)._loaded) return this.fetchList(key, true)

    return true
  }

  unmount = () => {
    this.setState(RESET_STATE)
    this.scrollToOffset = null
  }
}
