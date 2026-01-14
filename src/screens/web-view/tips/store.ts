/*
 * @Author: czy0729
 * @Date: 2023-06-23 14:19:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 09:21:58
 */
import { observable } from 'mobx'
import store from '@utils/store'
import { NAMESPACE, STATE, TABS } from './ds'

import type { Params } from './types'

export default class ScreenTips extends store<typeof STATE> {
  state = observable(STATE)

  params: Params

  init = () => {
    const { key } = this.params
    if (key) {
      const index = TABS.findIndex(item => item.key === key)
      if (index !== -1) {
        this.setState({
          uri: key
        })
      }
    }

    this.setState({
      _loaded: true
    })
  }

  /** 标签页切换 */
  onChange = (page: number) => {
    if (page === this.state.page) return

    this.setState({
      page
    })
    this.saveStorage(NAMESPACE)
  }

  /** 菜单切换 */
  onSelect = (title: string) => {
    const item = TABS.find(item => item.title === title)
    if (item && item.key !== this.state.uri) {
      this.setState({
        uri: item.key
      })
    }
  }
}
