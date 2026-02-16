/*
 * @Author: czy0729
 * @Date: 2025-07-26 21:40:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-30 05:15:06
 */
import { getTimestamp } from '@utils'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class ScreenTinygrailTopWeek extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded: getTimestamp()
    })

    return this.fetchTopWeek()
  }
}
