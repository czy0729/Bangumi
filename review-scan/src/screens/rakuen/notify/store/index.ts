/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-03 20:07:56
 */
import { usersStore } from '@stores'
import { queue } from '@utils/fetch'
import { TYPE_PAGE } from '../ds'
import Action from './action'
import { RESET_STATE } from './ds'

/** 人物页面状态机 */
export default class ScreenMono extends Action {
  init = () => {
    this.setState({
      page: TYPE_PAGE?.[this.params.type] || 0,
      _loaded: true
    })

    return queue([
      () => this.fetchNotify(),
      () => this.fetchPM(true, 'pmIn'),
      () => this.fetchPM(true, 'pmOut'),
      () => usersStore.fetchFriends()
    ])
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
