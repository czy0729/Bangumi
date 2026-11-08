/*
 * @Author: czy0729
 * @Date: 2023-06-23 14:19:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 12:00:00
 *
 * 当前展示的功能页 key: 路由参数初始化, 菜单可切换, 不做持久化
 */
import { observable } from 'mobx'
import store from '@utils/store'
import { STATE, TABS } from './ds'

import type { Params } from './types'

export default class ScreenTips extends store<typeof STATE> {
  state = observable(STATE)

  params: Params

  init = () => {
    const { key } = this.params
    if (key && TABS.some(item => item.key === key)) {
      this.setState({
        uri: key
      })
    }

    this.setState({
      _loaded: true
    })
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
