/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:49:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-28 05:44:37
 */
import { getTimestamp } from '@utils'
import Action from './action'
import { DEFAULT_TYPE, EXCLUDE_STATE, NAMESPACE } from './ds'

export default class ScreenTinygrailDeal extends Action {
  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60

    const state = await this.getStorage(NAMESPACE)
    const { type = DEFAULT_TYPE } = this.params
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      type,
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) return this.refresh()

    return true
  }
}
