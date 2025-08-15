/*
 * @Author: czy0729
 * @Date: 2024-12-31 00:51:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-14 01:44:16
 */
import { monoStore, subjectStore, tinygrailStore } from '@stores'
import { feedback, info, queue } from '@utils'
import { t } from '@utils/fetch'
import Computed from './computed'

export default class Action extends Computed {
  private _prev: string

  fetchInitial = (refresh = false) => {
    return tinygrailStore.fetchInitial(this.chara.id, refresh)
  }

  fetchMono = async () => {
    if (this.mono._loaded) return true

    return subjectStore.fetchMono({
      monoId: `character/${this.chara?.monoId}`
    })
  }

  refresh = async () => {
    await queue([
      () => tinygrailStore.fetchCharacters([this.monoId]),
      () => tinygrailStore.fetchAssets(),
      () => this.fetchInitial(true)
    ])
    monoStore.fetchPicTotal(this.chara.name)

    return this.fetchMono()
  }

  /** 注资 */
  doSubmit = async () => {
    const { loading, amount } = this.state
    if (loading) return

    if (!amount || amount < 5000) {
      info('必须大于 5000')
      return
    }

    this.setState({
      loading: true
    })

    const { id, monoId } = this.chara
    t('ICO交易.注资', {
      monoId,
      amount
    })

    const result = await tinygrailStore.doJoin({
      id,
      amount
    })
    feedback()

    if (!result) {
      info('注资失败')
      this.setState({
        loading: false
      })
      return
    }

    info('注资成功')
    this.setState({
      amount: 5000,
      loading: false
    })
    this.refresh()
  }

  // -------------------- page --------------------
  /** 金额格式过滤 */
  moneyNatural = (v: string) => {
    if (v && !/^(([1-9]\d*)|0)(\.\d{0,1}?)?$/.test(v)) {
      if (v === '.') return '0.'
      if (!v) return ''
      return this._prev
    }

    this._prev = v
    return v
  }

  /** 数量改变 */
  changeAmount = (amount: any) => {
    let _amount = parseInt(amount)

    if (isNaN(_amount)) _amount = 0

    this.setState({
      amount: _amount
    })
  }

  onStep = (value: 1 | -1 | 0 = 1) => {
    this.setState({
      step: value === 0 ? 0 : this.state.step + value
    })
    feedback(true)
  }
}
