/*
 * @Author: czy0729
 * @Date: 2020-03-22 18:47:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 21:44:07
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

/** 用户目录页面状态机 */
export default class ScreenCatelogs extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchCatalogs(this.key, true)
  }
}
