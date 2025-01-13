/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 07:01:44
 */
import { getTimestamp } from '@utils'
import { TABS } from '../ds'
import Action from './action'
import { NAMESPACE } from './ds'

export default class ScreenTinygrailICO extends Action {
  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60

    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) this.fetchList(TABS[this.state.page].key)

    return true
  }
}
