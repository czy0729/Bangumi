/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:49:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 04:51:31
 */
import { computed, observable } from 'mobx'
import { systemStore, tinygrailStore } from '@stores'
import { confirm, feedback, getTimestamp, info, toFixed } from '@utils'
import { queue, t } from '@utils/fetch'
import store from '@utils/store'
import { getXsbRelationOTA } from '@constants'
import { MonoId } from '@types'
import { DEFAULT_TYPE, EXCLUDE_STATE, NAMESPACE, STATE } from './ds'
import { Params } from './types'

export default class ScreenTinygrailDeal extends store<typeof STATE> {
  params: Params

  state = observable(STATE)

  prev: any = 0

  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60

    const state = await this.getStorage(NAMESPACE)
    const { type = DEFAULT_TYPE } = this.params
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      type,
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) return this.refresh()
    return true
  }

  refresh = () => {
    return queue([
      () => this.fetchCharaThenInitForm(),
      () => tinygrailStore.fetchDepth(this.monoId),
      () => tinygrailStore.fetchAssets(),
      () => tinygrailStore.fetchUserLogs(this.monoId),
      () => tinygrailStore.fetchIssuePrice(this.monoId)
    ])
  }

  fetchCharaThenInitForm = async () => {
    await tinygrailStore.fetchCharacters([this.monoId])

    this.initForm()
    return true
  }

  // -------------------- get --------------------
  /** 小圣杯缩短资金数字显示 */
  @computed get short() {
    return systemStore.setting.xsbShort
  }

  @computed get monoId() {
    const { monoId = '' } = this.params
    return monoId.replace('character/', '') as MonoId
  }

  /** 全局人物数据 */
  @computed get chara() {
    return tinygrailStore.characters(this.monoId)
  }

  /** 深度图 */
  @computed get depth() {
    return tinygrailStore.depth(this.monoId)
  }

  /** 用户资产 */
  @computed get assets() {
    return tinygrailStore.assets
  }

  /** 我的挂单和交易记录 */
  @computed get userLogs() {
    return tinygrailStore.userLogs(this.monoId)
  }

  /** 是否买入 */
  @computed get isBid() {
    const { type } = this.state
    return type === 'bid'
  }

  /** 当前可以买入的最大量 */
  @computed get max() {
    const { value } = this.state
    const { balance } = this.assets
    const { amount } = this.userLogs
    if (this.isBid) return value == 0 ? 0 : Math.floor(balance / Number(value))
    return amount
  }

  /** 角色发行价 */
  @computed get issuePrice() {
    return tinygrailStore.issuePrice(this.monoId)
  }

  /** 关联角色 */
  @computed get relation() {
    const XSBRelationData = getXsbRelationOTA()
    const { s, r = [] } = XSBRelationData.data[this.monoId] || {}
    return {
      s,
      subject: s ? XSBRelationData.name[s] : '',
      r: [Number(this.monoId), ...r]
    }
  }

  // -------------------- action --------------------
  /** 挂单 */
  doSubmit = () => {
    const { value, amount } = this.state
    if (!amount) {
      info('数量不能0')
      return
    }

    if (!value) {
      info('出价有误')
      return
    }

    if (this.isBid && Number(value) * amount > 20000) {
      confirm(`金额较大, 当前买入${amount}股 * ${value}, 确定?`, this.doSubmitConfirm, '小圣杯助手')
      return
    }

    this.doSubmitConfirm()
  }

  /** 挂单 */
  doSubmitConfirm = async () => {
    const { value, amount, isIce } = this.state
    t('交易.挂单', {
      monoId: this.monoId,
      type: this.isBid ? 'bid' : 'asks'
    })

    this.setState({
      loading: true
    })

    // 拆单
    const splits = splitAmount(amount)
    let result: any

    for (const item of splits) {
      result = await tinygrailStore[this.isBid ? 'doBid' : 'doAsk']({
        monoId: this.monoId,
        price: value,
        amount: item,
        isIce
      })
    }
    feedback()

    if (!result) {
      info('交易失败')
      this.setState({
        loading: false
      })
      return
    }

    this.setState({
      amount: 0,
      loading: false
    })
    this.refresh()
  }

  /** 取消挂单 */
  doCancel = async (type: string, id: any) => {
    t('交易.取消挂单', {
      monoId: this.monoId,
      type
    })

    const result = await tinygrailStore[type === 'bid' ? 'doCancelBid' : 'doCancelAsk']({
      id
    })
    feedback()

    if (!result) {
      info('取消失败')
      return
    }

    this.refresh()
  }

  /** 一键取消买卖挂单 */
  doCancelAll = async (type: string) => {
    t('交易.一键取消挂单', {
      monoId: this.monoId,
      type
    })

    const data = type === 'bid' ? this.userLogs.bids : this.userLogs.asks
    let result

    for (const item of data) {
      result = await tinygrailStore[type === 'bid' ? 'doCancelBid' : 'doCancelAsk']({
        id: item.id
      })
    }
    feedback()

    if (!result) {
      info('取消失败')
      return
    }

    this.refresh()
  }

  // -------------------- page --------------------
  /** 初始化表单数据 */
  initForm = () => {
    const { value } = this.state
    if (value) return

    const { current } = this.chara
    if (current) {
      this.setState({
        value: this.moneyNatural(current)
      })
    }
  }

  /** 切换买卖类型 */
  toggleType = (type: string) => {
    t('交易.切换买卖类型', {
      monoId: this.monoId,
      type
    })

    const { current } = this.chara
    if (type === 'bid') {
      this.setState({
        type: 'bid',
        value: this.moneyNatural(current),
        amount: 0
      })
      return
    }

    this.setState({
      type: 'ask',
      value: this.moneyNatural(current),
      amount: 0
    })
  }

  /** 金额格式过滤 */
  moneyNatural = (v: any) => {
    if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
      if (v === '.') return '0.'
      if (!v) return ''
      return this.prev
    }

    this.prev = v
    return v
  }

  /** 金额变动 */
  changeValue = (value: any, amount?: any) => {
    const { type } = this.state
    this.setState({
      value: this.moneyNatural(value),
      amount: type === 'bid' ? amount || 0 : 0
    })
  }

  /** 减少 */
  stepMinus = () => {
    const { value } = this.state
    let _value = parseFloat(this.moneyNatural(value)) - 0.1
    if (_value < 0) _value = 0.1

    this.setState({
      value: toFixed(_value, 2)
    })
  }

  /** 增加 */
  stepPlus = () => {
    const { value } = this.state
    const _value = parseFloat(this.moneyNatural(value)) + 0.1

    this.setState({
      value: toFixed(_value, 2)
    })
  }

  /** 数量改变 */
  changeAmount = (amount: any) => {
    let _amount = parseInt(amount)
    if (isNaN(_amount)) _amount = 0
    if (_amount > this.max) _amount = this.max
    this.setState({
      amount: _amount
    })
  }

  /** 展开|收起买卖记录 */
  toggleExpand = () => {
    const { expand } = this.state
    t('交易.切换买卖类型', {
      monoId: this.monoId
    })

    this.setState({
      expand: !expand
    })
  }

  /** 切换冰山委托 */
  switchIsIce = () => {
    const { isIce } = this.state
    t('交易.切换冰山', {
      monoId: this.monoId,
      isIce: !isIce
    })

    this.setState({
      isIce: !isIce
    })
    this.saveStorage(NAMESPACE)
  }
}

/** @deprecated 交易拆单避税 */
function splitAmount(amount: number) {
  return [amount]
}
