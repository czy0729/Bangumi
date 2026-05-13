/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:42:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 06:31:34
 */
import { getTimestamp } from '@utils'
import Action from './action'
import { NAMESPACE } from './ds'

export default class ScreenTinygrailAdvanceAsk extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      _loaded: getTimestamp()
    })

    const { _loaded } = this.advanceList
    if (!_loaded) this.fetchAdvanceList(false)
  }
}
