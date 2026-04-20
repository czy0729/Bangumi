/*
 * @Author: czy0729
 * @Date: 2025-03-05 04:46:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-08 21:45:14
 */
import { getTimestamp } from '@utils'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

/** 需求发布页面状态机 */
export default class ScreenTinygrailTransaction extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded: getTimestamp()
    })

    if (!this.list.length) this.getList()
  }
}
