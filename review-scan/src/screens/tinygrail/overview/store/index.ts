/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-16 20:27:20
 */
import { getTimestamp } from '@utils'
import Action from './action'
import { NAMESPACE } from './ds'

export default class ScreenTinygrailOverview extends Action {
  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) this.fetchList(this.currentKey)

    return true
  }
}
