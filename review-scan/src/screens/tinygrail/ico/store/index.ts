/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 07:01:44
 */
import { getTimestamp } from '@utils'
import { M1 } from '@constants'
import { TABS } from '../ds'
import Action from './action'
import { NAMESPACE, STATE } from './ds'

export default class ScreenTinygrailICO extends Action {
  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > M1

    const storageData = await this.getStorageOnce<typeof STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) return this.fetchList(TABS[this.state.page].key)

    return true
  }
}
