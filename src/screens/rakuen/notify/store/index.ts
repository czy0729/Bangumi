/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 06:52:39
 */
import { queue } from '@utils/fetch'
import { TYPE_PAGE } from '../ds'
import Action from './action'

/** 人物页面状态机 */
export default class ScreenMono extends Action {
  init = async () => {
    this.setState({
      page: TYPE_PAGE?.[this.params.type] || 0,
      _loaded: true
    })

    return queue([
      () => this.fetchNotify(),
      () => this.fetchPM(true, 'pmIn'),
      () => this.fetchPM(true, 'pmOut')
    ])
  }
}
