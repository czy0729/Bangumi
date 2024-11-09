/*
 * @Author: czy0729
 * @Date: 2024-11-09 07:18:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-09 07:20:29
 */
import Fetch from './fetch'

/** 条目目录页面状态机 */
export default class ScreenSubjectCatalogs extends Fetch {
  init = () => {
    this.setState({
      _loaded: true
    })

    return this.fetchSubjectCatalogs(true)
  }

  onHeaderRefresh = () => {
    return this.fetchSubjectCatalogs(true)
  }
}
