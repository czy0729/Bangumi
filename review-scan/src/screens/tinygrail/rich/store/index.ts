/*
 * @Author: czy0729
 * @Date: 2025-07-08 16:13:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-08 16:13:40
 */
import { getTimestamp } from '@utils'
import Action from './action'
import { NAMESPACE } from './ds'

export default class ScreenTinygrailRich extends Action {
  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60

    const localState = await this.getStorage(NAMESPACE)
    if (localState.page > 2) localState.page = 0
    this.setState({
      ...localState,
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) {
      const { page } = this.state
      this.fetchRich(this.key(page))
    }

    return true
  }
}
