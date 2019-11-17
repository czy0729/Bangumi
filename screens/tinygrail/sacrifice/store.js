/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:11:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-17 13:57:03
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'
import { info } from '@utils/ui'

export default class ScreenTinygrailSacrifice extends store {
  state = observable({
    loading: false,
    amount: 500, // 只能是整数
    expand: false // 展开所有圣殿
  })

  init = () => this.refresh()

  refresh = () =>
    Promise.all([
      tinygrailStore.fetchCharacters([this.monoId]),
      tinygrailStore.fetchUserLogs(this.monoId),
      tinygrailStore.fetchCharaTemple(this.monoId)
    ])

  // -------------------- get --------------------
  @computed get monoId() {
    const { monoId = '' } = this.params
    return monoId.replace('character/', '')
  }

  @computed get hash() {
    return tinygrailStore.hash
  }

  @computed get chara() {
    return tinygrailStore.characters(this.monoId)
  }

  @computed get userLogs() {
    return tinygrailStore.userLogs(this.monoId)
  }

  @computed get charaTemple() {
    return tinygrailStore.charaTemple(this.monoId)
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
      _amount = 0
    }

    this.setState({
      amount: _amount
    })
  }

  /**
   * 展开/收起所有圣殿
   */
  toggleExpand = () => {
    const { expand } = this.state
    this.setState({
      expand: !expand
    })
  }
}
