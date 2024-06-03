/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:20:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-03 11:49:37
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

/** 搜索页面状态机 */
class ScreenSearch extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded: true
    })

    this.initState()
    return true
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.doSearch(true)
  }
}

export default ScreenSearch
