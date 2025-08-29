/*
 * @Author: czy0729
 * @Date: 2019-11-29 21:58:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-26 01:10:08
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

/** 我的道具面状态机 */
export default class ScreenTinygrailItems extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchItems()
  }
}
