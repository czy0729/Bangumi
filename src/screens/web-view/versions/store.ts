/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:41:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 18:00:00
 *
 * 当前展示的更新文档 key: 不做持久化, 每次以默认项进入
 */
import { observable } from 'mobx'
import store from '@utils/store'
import { STATE, TABS } from './ds'

export default class ScreenVersions extends store<typeof STATE> {
  state = observable(STATE)

  init = () => {
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
