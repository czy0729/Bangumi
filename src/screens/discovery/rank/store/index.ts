/*
 * @Author: czy0729
 * @Date: 2019-06-08 03:11:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-24 10:16:10
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

/** 排行榜页面状态机 */
class ScreenRank extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchRank()
  }
}

export default ScreenRank
