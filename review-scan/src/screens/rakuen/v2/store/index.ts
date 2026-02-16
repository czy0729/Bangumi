/*
 * @Author: czy0729
 * @Date: 2019-04-27 13:09:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 20:05:34
 */
import Action from './action'
import { EXCLUDE_STATE, INIT_PREFETCH_STATE, NAMESPACE, STATE } from './ds'

export default class ScreenRakuen extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...INIT_PREFETCH_STATE,
      ...EXCLUDE_STATE,
      _loaded: true
    })
    this.fetchRakuen()

    // 延迟加载标记
    setTimeout(() => {
      this.setState({
        _mounted: true
      })
    }, 80)

    return true
  }
}
