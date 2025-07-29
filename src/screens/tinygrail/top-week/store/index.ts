/*
 * @Author: czy0729
 * @Date: 2025-07-26 21:40:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-29 17:29:56
 */
import { getTimestamp } from '@utils'
import Action from './action'

export default class ScreenTinygrailTopWeek extends Action {
  init = () => {
    this.setState({
      _loaded: getTimestamp()
    })

    return this.fetchTopWeek()
  }
}
