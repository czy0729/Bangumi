/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:49:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-12 14:07:58
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'

export default class ScreenDeal extends store {
  state = observable({
    type: 'bid', // 买卖类型
    value: 0, // 只能到一位小数
    amount: 0 // 只能是整数
  })

  prev = 0

  init = async () =>
    Promise.all([
      tinygrailStore.fetchCharacters([this.monoId]),
      tinygrailStore.fetchDepth(this.monoId),
      tinygrailStore.fetchAssets(),
      tinygrailStore.fetchUserLogs(this.monoId)
    ])

  // -------------------- get --------------------
  @computed get monoId() {
    const { monoId = '' } = this.params
    return monoId.replace('character/', '')
  }

  @computed get chara() {
    return tinygrailStore.characters(this.monoId)
  }

  @computed get depth() {
    return tinygrailStore.depth(this.monoId)
  }

  @computed get assets() {
    return tinygrailStore.assets
  }

  @computed get userLogs() {
    return tinygrailStore.userLogs(this.monoId)
  }

  // -------------------- action --------------------
  doSubmit = () => {}

  // -------------------- page --------------------
  initForm = () => {}

  /**
   * 切换买卖类型
   */
  toggleType = type => {
    if (type === 'bid') {
      this.setState({
        type: 'bid'
      })
      return
    }

    this.setState({
      type: 'ask'
    })
  }

  moneyNatural = v => {
    if (v && !/^(([1-9]\d*)|0)(\.\d{0,1}?)?$/.test(v)) {
      if (v === '.') {
        return '0.'
      }

      if (!v) {
        return ''
      }

      return this.prev
    }

    this.prev = v

    return v
  }

  changeValue = value => {
    this.setState({
      value: this.moneyNatural(value),
      amount: 0
    })
  }

  stepMinus = () => {
    const { value } = this.state
    let _value = parseFloat(this.moneyNatural(value)) - 1
    if (_value < 0) {
      _value = 0.1
    }
    this.setState({
      value: _value.toFixed(1)
    })
  }

  stepPlus = () => {
    const { value } = this.state
    const _value = parseFloat(this.moneyNatural(value)) + 1
    this.setState({
      value: _value.toFixed(1)
    })
  }

  changeAmount = amount => {
    this.setState({
      amount: parseInt(amount)
    })
  }
}
