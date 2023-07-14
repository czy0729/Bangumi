/*
 * @Author: czy0729
 * @Date: 2023-06-23 14:19:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-13 07:12:30
 */
import { observable } from 'mobx'
import store from '@utils/store'
import { NAMESPACE, STATE, TABS } from './ds'
import { Params } from './types'

export default class ScreenTips extends store {
  state = observable(STATE)

  params: Params

  init = async () => {
    const state = await this.getStorage(NAMESPACE)
    const { key } = this.params
    if (key) {
      const index = TABS.findIndex(item => item.key === key)
      if (index !== -1) state.page = index
    }

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
