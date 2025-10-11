/*
 * @Author: czy0729
 * @Date: 2019-09-20 00:46:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-31 00:54:47
 */
import { getTimestamp } from '@utils'
import { M1 } from '@constants'
import Action from './action'

export default class ScreenTinygrailICODeal extends Action {
  init = () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > M1
    this.setState({
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) return this.refresh()

    return true
  }
}
