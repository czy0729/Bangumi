/*
 * @Author: czy0729
 * @Date: 2021-02-03 22:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 10:10:59
 */
import { observable, computed } from 'mobx'
import { discoveryStore } from '@stores'
import store from '@utils/store'
import { NAMESPACE, KEYS, TOP_DS, TYPE_DS, RELATION_DS, LAST_DS, STATE } from './ds'

export default class ScreenWiki extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    const res = this.getStorage(NAMESPACE)
    const state = await res
    this.setState({
      ...state,
      _loaded: true
    })
    return discoveryStore.fetchWiki()
  }

  // -------------------- get --------------------
  @computed get wiki() {
    return discoveryStore.wiki
  }

  @computed get segement() {
    const { top, type, relation, last } = this.state
    let key
    let values
    let selectedIndex
    if (top === 1) {
      key = 'relation'
      values = RELATION_DS
      selectedIndex = relation
    } else if (top === 2) {
      key = 'last'
      values = LAST_DS
      selectedIndex = last
    } else {
      key = 'type'
      values = TYPE_DS
      selectedIndex = type
    }

    return {
      key,
      values,
      selectedIndex
    }
  }

  @computed get list() {
    const { timeline = {}, last: wikiLast = {} } = this.wiki
    const { top, type, relation, last } = this.state
    if (top === 0) return timeline[KEYS[`${top}|${type}`]] || []
    if (top === 1) return timeline[KEYS[`${top}|${relation}`]] || []
    return wikiLast[KEYS[`${top}|${last}`]] || []
  }

  // -------------------- page --------------------
  onChangeTop = title => {
    this.setState({
      top: TOP_DS.findIndex(item => item === title)
    })
    this.setStorage(NAMESPACE)
  }

  onChangeSub = title => {
    const { key, values } = this.segement
    this.setState({
      [key]: values.findIndex(item => item === title)
    })
    this.setStorage(NAMESPACE)
  }
}
