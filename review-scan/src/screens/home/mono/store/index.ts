/*
 * @Author: czy0729
 * @Date: 2019-05-11 16:23:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-26 20:11:02
 */
import { queue } from '@utils'
import Action from './action'
import { RESET_STATE } from './ds'

/** 人物页面状态机 */
export default class ScreenMono extends Action {
  init = () => {
    this.fetchMonoFromOSS()

    // 设置开启小圣杯和是虚拟人物
    if (this.tinygrail && this.monoId.includes('character/')) {
      return queue([() => this.fetchMono(), () => this.fetchChara()])
    }

    return this.fetchMono()
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchMono()
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
