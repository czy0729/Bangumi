/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:11:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-03 04:17:52
 */
import { Alert } from 'react-native'
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { setStorage, getTimestamp, formatNumber, toFixed } from '@utils'
import store from '@utils/store'
import { queue, t } from '@utils/fetch'
import { info } from '@utils/ui'

const namespace = 'ScreenTinygrailSacrifice'
const excludeState = {
  amount: 0, // 只能是整数,
  isSale: false, // 股权融资
  expand: false, // 展开所有圣殿
  auctionLoading: false,
  auctionAmount: 0,
  auctionPrice: 0
}

export default class ScreenTinygrailSacrifice extends store {
  state = observable({
    showCover: true, // 显示封面
    showLogs: true, // 显示记录
    showTemples: true, // 显示圣殿
    showUsers: true, // 显示董事会
    ...excludeState,
    lastAuction: {
      price: '',
      amount: '',
      time: 0
    },
    loading: false
  })

  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - _loaded > 60

    const state = await this.getStorage(undefined, namespace)
    const lastAuction = (await this.getStorage(
      undefined,
      `${namespace}|lastAuction|${this.monoId}`
    )) || {
      price: '',
      amount: '',
      time: 0
    }
    this.setState({
      ...state,
      ...excludeState,
      lastAuction,
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) {
      return this.refresh()
    }
    return true
  }

  refresh = () =>
    queue([
      () => tinygrailStore.fetchCharacters([this.monoId]), // 角色小圣杯信息
      () => tinygrailStore.fetchUserLogs(this.monoId), // 本角色我的交易信息
      () => tinygrailStore.fetchCharaTemple(this.monoId), // 固定资产
      () => tinygrailStore.fetchAssets(), // 自己的资产
      () => tinygrailStore.fetchIssuePrice(this.monoId),
      () => this.fetchValhallChara(),
      () => tinygrailStore.fetchAuctionStatus(this.monoId),
      () => tinygrailStore.fetchAuctionList(this.monoId), // 上周拍卖信息
      () => tinygrailStore.fetchUsers(this.monoId.replace('character/', '')) // 董事会
    ])

  fetchValhallChara = async () => {
    let res
    try {
      res = tinygrailStore.fetchValhallChara(this.monoId) // 本次拍卖信息
      const { price } = await res
      if (price) {
        this.setState({
          auctionPrice: toFixed(price + 0.01, 2)
        })
      }
    } catch (error) {
      // do nothing
    }
    return res
  }

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

  @computed get assets() {
    return tinygrailStore.assets
  }

  @computed get valhallChara() {
    return tinygrailStore.valhallChara(this.monoId)
  }

  @computed get auctionList() {
    return tinygrailStore.auctionList(this.monoId)
  }

  @computed get auctionStatus() {
    return tinygrailStore.auctionStatus(this.monoId)
  }

  @computed get issuePrice() {
    return tinygrailStore.issuePrice(this.monoId)
  }

  @computed get users() {
    return tinygrailStore.users(this.monoId.replace('character/', ''))
  }

  @computed get myTemple() {
    const { list } = this.charaTemple
    return list.find(item => item.name === this.hash) || {}
  }

  // -------------------- action --------------------
  /**
   * 资产重组
   */
  doSacrifice = async () => {
    const { loading } = this.state
    if (loading) {
      return
    }

    this.setState({
      loading: true
    })

    const { amount, isSale } = this.state
    if (!amount) {
      info('请输入数量')
      this.setState({
        loading: false
      })
      return
    }

    t('资产重组.资产重组', {
      monoId: this.monoId,
      amount,
      isSale
    })

    const { State, Value, Message } = await tinygrailStore.doSacrifice({
      monoId: this.monoId,
      amount,
      isSale
    })

    if (State !== 0) {
      info(Message)
      this.setState({
        loading: false
      })
      return
    }

    Alert.alert(
      '小圣杯助手',
      isSale
        ? `融资完成！获得资金 ${formatNumber(Value.Balance)}`
        : `融资完成！获得资金 ${formatNumber(Value.Balance)} ${
            Value.Items.length ? '掉落道具' : ''
          } ${Value.Items.map(item => `「${item.Name}」×${item.Count}`).join(
            ' '
          )}`,
      [
        {
          text: '知道了'
        }
      ]
    )
    this.setState({
      loading: false
    })
    this.refresh()
  }

  /**
   * 竞拍
   */
  doAuction = async () => {
    const { auctionLoading } = this.state
    if (auctionLoading) {
      return
    }

    this.setState({
      auctionLoading: true
    })

    const { auctionAmount, auctionPrice } = this.state
    if (!auctionPrice) {
      info('请输入价格')
      this.setState({
        auctionLoading: false
      })
      return
    }

    if (!auctionAmount) {
      info('请输入数量')
      this.setState({
        auctionLoading: false
      })
      return
    }

    t('资产重组.竞拍', {
      monoId: this.monoId
    })

    const { State, Value, Message } = await tinygrailStore.doAuction({
      monoId: this.monoId,
      price: auctionPrice,
      amount: auctionAmount
    })

    if (State !== 0) {
      info(Message)
      this.setState({
        auctionLoading: false
      })
      return
    }

    info(Value)
    this.cacheLastAuction(auctionPrice, auctionAmount)
    this.setState({
      auctionLoading: false,
      auctionAmount: 0
    })
    this.refresh()
  }

  // -------------------- page --------------------
  /**
   * 金额格式过滤
   */
  moneyNatural = v => {
    if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
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
   * 竞拍价钱改变
   */
  changeAuctionPrice = value => {
    const state = {
      auctionPrice: this.moneyNatural(value)
    }

    this.setState(state)
  }

  /**
   * 竞拍数量改变
   */
  changeAuctionAmount = amount => {
    let _amount = parseInt(amount)

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(_amount)) {
      _amount = 0
    }

    this.setState({
      auctionAmount: _amount
    })
  }

  /**
   * 菜单选择改变竞拍数量
   */
  changeAuctionAmountByMenu = title => {
    t('资产重组.菜单改变竞拍数量', {
      monoId: this.monoId
    })

    const { sacrifices = 0 } = this.myTemple
    const { amount: userAmount } = this.userLogs
    const { amount } = this.valhallChara
    switch (title) {
      case '到500':
        if (sacrifices + userAmount >= 500) {
          info('已持有和献祭超过500股')
          return
        }
        this.changeAuctionAmount(
          Math.min(500 - sacrifices - userAmount, amount)
        )
        return
      case '到2500':
        if (sacrifices + userAmount >= 2500) {
          info('已持有和献祭超过2500股')
          return
        }
        this.changeAuctionAmount(
          Math.min(2500 - sacrifices - userAmount, amount)
        )
        return
      case '到12500':
        if (sacrifices + userAmount >= 12500) {
          info('已持有和献祭超过12500股')
          return
        }
        this.changeAuctionAmount(
          Math.min(12500 - sacrifices - userAmount, amount)
        )
        return
      default:
        this.changeAuctionAmount(amount)
    }
  }

  /**
   * 减少
   */
  stepMinus = () => {
    const { auctionPrice } = this.state
    let _value =
      parseFloat(this.moneyNatural(auctionPrice) || auctionPrice) - 0.1
    if (_value < 0) {
      _value = 1
    }

    this.setState({
      auctionPrice: toFixed(_value, 2)
    })
  }

  /**
   * 增加
   */
  stepPlus = () => {
    const { auctionPrice } = this.state
    const _value =
      parseFloat(this.moneyNatural(auctionPrice) || auctionPrice) + 0.1

    this.setState({
      auctionPrice: toFixed(_value, 2)
    })
  }

  /**
   * 展开/收起所有圣殿
   */
  toggleExpand = () => {
    const { expand } = this.state
    t('资产重组.展开收起圣殿', {
      expand: !expand
    })

    this.setState({
      expand: !expand
    })
  }

  /**
   * 记忆上次出价
   */
  cacheLastAuction = (price, amount) => {
    const data = {
      price,
      amount,
      time: getTimestamp()
    }
    this.setState({
      lastAuction: data
    })

    const key = `${namespace}|lastAuction|${this.monoId}`
    setStorage(key, data)
  }

  /**
   * 切换股权融资
   */
  switchIsSale = () => {
    const { isSale } = this.state
    this.setState({
      isSale: !isSale
    })
  }

  /**
   * 展开收起封面
   */
  toggleCover = () => {
    const { showCover } = this.state
    t('资产重组.展开收起封面', {
      showCover: !showCover
    })

    this.setState({
      showCover: !showCover
    })
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 展开收起记录
   */
  toggleLogs = () => {
    const { showLogs } = this.state
    t('资产重组.展开收起记录', {
      showLogs: !showLogs
    })

    this.setState({
      showLogs: !showLogs
    })
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 展开收起圣殿板块
   */
  toggleTemples = () => {
    const { showTemples } = this.state
    t('资产重组.展开收起圣殿板块', {
      showTemples: !showTemples
    })

    this.setState({
      showTemples: !showTemples
    })
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 展开收起董事会
   */
  toggleUsers = () => {
    const { showUsers } = this.state
    t('资产重组.展开收起董事会', {
      showUsers: !showUsers
    })

    this.setState({
      showUsers: !showUsers
    })
    this.setStorage(undefined, undefined, namespace)
  }
}
