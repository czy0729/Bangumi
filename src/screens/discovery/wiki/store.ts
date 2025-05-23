/*
 * @Author: czy0729
 * @Date: 2021-02-03 22:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-04 07:35:13
 */
import { computed, observable } from 'mobx'
import { discoveryStore } from '@stores'
import store from '@utils/store'
import { KEYS, LAST_DS, NAMESPACE, RELATION_DS, STATE, TOP_DS, TYPE_DS } from './ds'
import { TopIndex } from './types'

export default class ScreenWiki extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      _loaded: true
    })

    return discoveryStore.fetchWiki()
  }

  save = () => {
    return this.saveStorage(NAMESPACE)
  }

  // -------------------- get --------------------
  @computed get wiki() {
    return discoveryStore.wiki
  }

  @computed get segement() {
    const { top } = this.state

    let key: string
    let values: typeof RELATION_DS | typeof LAST_DS | typeof TYPE_DS
    let selectedIndex: number
    if (top === 1) {
      key = 'relation'
      values = RELATION_DS
      selectedIndex = this.state.relation
    } else if (top === 2) {
      key = 'last'
      values = LAST_DS
      selectedIndex = this.state.last
    } else {
      key = 'type'
      values = TYPE_DS
      selectedIndex = this.state.type
    }

    return {
      key,
      values,
      selectedIndex
    }
  }

  @computed get list() {
    const { timeline = {} } = this.wiki
    const { top } = this.state
    if (top === 0) return timeline[KEYS[`${top}|${this.state.type}`]] || []
    if (top === 1) return timeline[KEYS[`${top}|${this.state.relation}`]] || []

    const { last = {} } = this.wiki
    return last[KEYS[`${top}|${this.state.last}`]] || []
  }

  // -------------------- page --------------------
  onChangeTop = (title: string) => {
    this.setState({
      top: TOP_DS.findIndex(item => item === title) as TopIndex
    })
    this.save()
  }

  onChangeSub = (title: string) => {
    const { key, values } = this.segement
    this.setState({
      [key]: values.findIndex((item: string) => item === title)
    })
    this.save()
  }
}
