/*
 * @Params: { _name, _jp, _image }
 * @Author: czy0729
 * @Date: 2019-05-11 16:23:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-21 18:37:52
 */
import Action from './action'

export default class ScreenMono extends Action {
  init = () => {
    this.fetchMonoFromOSS()

    // 设置开启小圣杯和是虚拟人物
    if (this.tinygrail && this.monoId.includes('character/')) {
      return Promise.all([this.fetchMono(true), this.fetchChara()])
    }

    return this.fetchMono(true)
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchMono(true)
  }
}
