/*
 * @Author: czy0729
 * @Date: 2025-07-26 21:40:30
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-07-26 21:40:30
 */
import { feedback } from '@utils'
import { MAX_PREV } from '../ds'
import Fetch from './fetch'

export default class Action extends Fetch {
  onSubtractDay = (step: 1 | -1) => {
    this.setState({
      prev: Math.min(MAX_PREV, Math.max(this.state.prev + step, 0))
    })
    this.fetchTopWeekHistory()
    feedback(true)
  }
}
