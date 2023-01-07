/*
 * @Author: czy0729
 * @Date: 2023-01-07 16:44:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-07 22:26:34
 */
import { computed, observable } from 'mobx'
import { info } from '@utils'
import store from '@utils/store'
import DS from '@assets/json/advance.json'

const NAMESPACE = 'ScreeSponsor'

export default class ScreeSponsor extends store {
  state = observable({
    list: true,
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    this.setState({
      ...state,
      _loaded: true
    })

    return true
  }

  // -------------------- get --------------------
  @computed get list() {
    return Object.keys(DS)
  }

  // -------------------- page --------------------
  onToggle = () => {
    const { list } = this.state
    const value = !list
    this.setState({
      list: value
    })
    this.setStorage(NAMESPACE)

    if (value) {
      info('列表显示')
    } else {
      info('按打赏金额分布显示')
    }
  }
}
