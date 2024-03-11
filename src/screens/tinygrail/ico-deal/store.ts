/*
 * @Author: czy0729
 * @Date: 2019-09-20 00:46:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 10:28:35
 */
import { computed, observable } from 'mobx'
import { systemStore, tinygrailStore, userStore } from '@stores'
import { feedback, getTimestamp, info } from '@utils'
import { t } from '@utils/fetch'
import store from '@utils/store'
import { Id } from '@types'
import { STATE } from './ds'
import { Params } from './types'

export default class ScreenTinygrailICODeal extends store<typeof STATE> {
  params: Params

  state = observable(STATE)

  prev: any

  init = () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - _loaded > 60
    this.setState({
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) return this.refresh()

    return true
  }

  refresh = async () => {
    await Promise.all([tinygrailStore.fetchCharacters([this.monoId]), tinygrailStore.fetchAssets()])

    const { id } = this.chara
    return tinygrailStore.fetchInitial(id)
  }

  // -------------------- get --------------------
  @computed get short() {
    return systemStore.setting.xsbShort
  }

  @computed get monoId() {
    const { monoId = '' } = this.params
    return monoId.replace('character/', '') as Id
  }

  @computed get chara() {
    return tinygrailStore.characters(this.monoId)
  }

  @computed get assets() {
    return tinygrailStore.assets
  }

  @computed get initial() {
    const { id } = this.chara
    return tinygrailStore.initial(id)
  }

  @computed get userInfo() {
    return userStore.userInfo
  }

  // -------------------- action --------------------
  /** 注资 */
  doSubmit = async () => {
    const { loading, amount } = this.state
    if (loading) return

    if (!amount || amount < 5000) {
      info('必须大于5000')
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
      return this.prev
    }

    this.prev = v
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
}
