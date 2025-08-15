/*
 * @Author: czy0729
 * @Date: 2024-12-28 05:41:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 19:54:16
 */
import { tinygrailStore } from '@stores'
import { confirm, feedback, info, toFixed } from '@utils'
import { queue, t } from '@utils/fetch'
import Computed from './computed'
import { NAMESPACE } from './ds'

export default class Action extends Computed {
  prev: any = 0

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

  /** 初始化表单数据 */
  initForm = () => {
    if (this.state.value) return

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
    if (this.state.type === 'bid') {
      this.setState({
        value: this.moneyNatural(value),
        amount: amount || 0
      })
    } else {
      this.setState({
        value: this.moneyNatural(value)
      })
    }
  }

  /** 减少 */
  stepMinus = () => {
    let _value = parseFloat(this.moneyNatural(this.state.value)) - 1
    if (_value < 0) _value = 0.1
    this.setState({
      value: toFixed(_value, 2)
    })
  }

  /** 增加 */
  stepPlus = () => {
    const _value = parseFloat(this.moneyNatural(this.state.value)) + 1
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
    this.setState({
      expand: !this.state.expand
    })

    t('交易.切换买卖类型', {
      monoId: this.monoId
    })
  }

  /** 切换冰山委托 */
  switchIsIce = () => {
    const value = !this.state.isIce
    this.setState({
      isIce: value
    })
    this.saveStorage(NAMESPACE)

    t('交易.切换冰山', {
      monoId: this.monoId,
      isIce: value
    })
  }

  /** 挂单 */
  doSubmit = () => {
    const { value, amount } = this.state
    if (!amount) {
      info('数量不能 0')
      return
    }

    if (!value) {
      info('出价有误')
      return
    }

    if (this.isBid && Number(value) * amount > 20000) {
      confirm(
        `金额较大, 当前买入 ${amount}股 * ${value}, 确定?`,
        this.doSubmitConfirm,
        '小圣杯助手'
      )
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
}

/** 交易拆单避税 */
function splitAmount(amount: number) {
  return [amount]
}
