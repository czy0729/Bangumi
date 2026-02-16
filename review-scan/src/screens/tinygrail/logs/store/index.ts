/*
 * @Author: czy0729
 * @Date: 2025-04-20 16:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-20 16:35:12
 */
import { getTimestamp } from '@utils'
import Action from './action'
import { NAMESPACE } from './ds'

export default class ScreenTinygrailLogs extends Action {
  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60

    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      _loaded: needFetch ? current : _loaded
    })
    if (needFetch) this.fetchBalance()

    return true
  }
}
