/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:41:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 11:49:55
 */
import { observable } from 'mobx'
import store from '@utils/store'
import { NAMESPACE, STATE } from './ds'

export default class ScreenXXX extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    const state = await this.getStorage(NAMESPACE)
    this.setState({
      ...state,
      _loaded: true
    })
  }

  /** 标签页切换 */
  onChange = (page: number) => {
    if (page === this.state.page) return

    this.setState({
      page
    })
    this.setStorage(NAMESPACE)
  }
}
