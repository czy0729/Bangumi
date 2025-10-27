/*
 * @Author: czy0729
 * @Date: 2025-01-14 16:47:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 16:48:20
 */
import { TABS } from '../ds'
import Action from './action'

export default class ScreenTinygrailBid extends Action {
  init = async () => {
    const { type } = this.params
    const page = TABS.findIndex(item => item.key === type)
    this.setState({
      page,
      _loaded: true
    })
    this.fetchList(this.currentKey)
  }
}
