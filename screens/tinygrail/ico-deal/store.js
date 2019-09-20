/*
 * @Author: czy0729
 * @Date: 2019-09-20 00:46:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-20 22:53:22
 */
import { observable, computed } from 'mobx'
import { tinygrailStore, userStore } from '@stores'
import store from '@utils/store'
import { info } from '@utils/ui'

export default class ScreenTinygrailDeal extends store {
  state = observable({
    loading: false,
    amount: 1000 // 只能是整数
  })

  init = () => this.refresh()

  refresh = async () => {
    await Promise.all([
      tinygrailStore.fetchCharacters([this.monoId]),
      tinygrailStore.fetchAssets()
    ])

    const { icoId } = this.chara
    return tinygrailStore.fetchInitial(icoId)
  }

  // -------------------- get --------------------
  @computed get monoId() {
    const { monoId = '' } = this.params
    return monoId.replace('character/', '')
  }

  @computed get chara() {
    return tinygrailStore.characters(this.monoId)
  }

  @computed get assets() {
    return tinygrailStore.assets
  }

  @computed get initial() {
    const { icoId } = this.chara
    return tinygrailStore.initial(icoId)
  }

  @computed get userInfo() {
    return userStore.userInfo
  }

  // -------------------- action --------------------
  /**
   * 注资
   */
  doSubmit = async () => {
    const { loading, amount } = this.state
    if (loading) {
      return
    }

    if (!amount || amount < 1000) {
      info('必须大于1000')
      return
    }

    this.setState({
      loading: true
    })

    const { icoId } = this.chara
    const result = await tinygrailStore.doJoin({
      id: icoId,
      amount
    })

    if (!result) {
      info('注资失败')
      this.setState({
        loading: false
      })
      return
    }

    info('注资成功')
    this.setState({
      amount: 1000,
      loading: false
    })
    this.refresh()
  }

  // -------------------- page --------------------
  /**
   * 金额格式过滤
   */
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

  /**
   * 数量改变
   */
  changeAmount = amount => {
    let _amount = parseInt(amount)

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(_amount)) {
      _amount = 1000
    }

    this.setState({
      amount: _amount
    })
  }
}
