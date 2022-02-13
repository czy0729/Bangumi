/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:11:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-02-14 06:33:04
 */
import { Alert } from 'react-native'
import { observable, computed } from 'mobx'
import { tinygrailStore, systemStore } from '@stores'
import { setStorage, getStorage, getTimestamp, formatNumber, toFixed } from '@utils'
import store from '@utils/store'
import { queue, t, xhrCustom } from '@utils/fetch'
import { info, feedback } from '@utils/ui'
import { API_TINYGRAIL_STAR } from '@constants/api'
import { getXsbRelationOTA } from '@constants/cdn'
import { decimal, calculateRate } from '@tinygrail/_/utils'
import { ITEMS_TYPE } from '@tinygrail/_/characters-modal'

const namespace = 'ScreenTinygrailSacrifice'
const excludeState = {
  amount: 0, // 只能是整数,
  isSale: false, // 股权融资
  expand: false, // 展开所有圣殿
  auctionLoading: false,
  auctionAmount: 0,
  auctionPrice: 0,
  starForcesValue: 0,
  loading: false
}
const initLastAuction = {
  price: '',
  amount: '',
  time: 0
}
const initLastSacrifice = {
  amount: '',
  total: '',
  time: 0
}

export default class ScreenTinygrailSacrifice extends store {
  state = observable({
    // 页面全局
    showCover: true, // 显示封面
    showLogs: true, // 显示记录
    showTemples: true, // 显示圣殿
    showUsers: true, // 显示董事会
    showSacrifice: true, // 显示献祭模块
    showStarForces: true, // 显示星之力模块
    showAuction: true, // 显示竞拍模块
    showItems: true, // 显示道具模块

    // 通天塔各分段排名需要的献祭数
    rankStarForces: {
      20: '',
      40: '',
      60: '',
      80: '',
      100: '',
      200: '',
      300: '',
      400: '',
      500: '',
      _loaded: 0
    },
    ...excludeState,

    // 角色独立
    lastAuction: initLastAuction,
    lastSacrifice: initLastSacrifice
  })

  prev = 0

  init = async () => {
    const state = (await this.getStorage(undefined, namespace)) || {}
    const lastAuction = (await getStorage(this.namespaceLastAuction)) || initLastAuction
    const lastSacrifice =
      (await getStorage(this.namespaceLastSacrifice)) || initLastSacrifice

    const current = getTimestamp()
    this.setState({
      ...state,
      ...excludeState,
      lastAuction,
      lastSacrifice,
      _loaded: current
    })

    const { rankStarForces } = this.state
    if (!rankStarForces._loaded || current - rankStarForces._loaded > 600) {
      this.fetchStarForcesRankValues()
    }

    return this.refresh()
  }

  refresh = async update => {
    if (!update) {
      return queue([
        () => tinygrailStore.fetchCharacters([this.monoId]), // 角色小圣杯信息
        () => tinygrailStore.fetchUserLogs(this.monoId), // 本角色我的交易信息
        () => tinygrailStore.fetchAssets(), // 自己的资产
        () => tinygrailStore.fetchIssuePrice(this.monoId), // 角色发行价
        () => this.fetchValhallChara(), // 本次拍卖信息
        () => tinygrailStore.fetchCharaTemple(this.monoId), // 所有人固定资产 (可以得到自己的可用资产)
        () => tinygrailStore.fetchAuctionStatus(this.monoId), // 当前拍卖状态
        () => tinygrailStore.fetchAuctionList(this.monoId), // 上周拍卖信息
        () => tinygrailStore.fetchUsers(this.monoId) // 董事会
      ])
    }

    await queue([
      () => tinygrailStore.fetchUserLogs(this.monoId), // 本角色我的交易信息
      () => tinygrailStore.fetchAssets(), // 自己的资产
      () => tinygrailStore.fetchAuctionStatus(this.monoId) // 当前拍卖状态
    ])

    // 更新我的资产
    const { amount = 0, sacrifices = 0 } = this.userLogs
    return tinygrailStore.updateMyCharaAssets(this.monoId, amount, sacrifices)
  }

  fetchValhallChara = async () => {
    let res
    try {
      res = tinygrailStore.fetchValhallChara(this.monoId)
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

  fetchStarForcesRankValues = async () => {
    const rankStarForces = {
      _loaded: getTimestamp()
    }
    try {
      for (let i = 1; i <= 5; i += 1) {
        const { _response } = await xhrCustom({
          url: API_TINYGRAIL_STAR(i * 100, 1)
        })
        const { Value } = JSON.parse(_response)
        rankStarForces[i * 100] = Value[0].StarForces
      }

      for (let i = 1; i <= 4; i += 1) {
        const { _response } = await xhrCustom({
          url: API_TINYGRAIL_STAR(i * 20, 1)
        })
        const { Value } = JSON.parse(_response)
        rankStarForces[i * 20] = Value[0].StarForces
      }
    } catch (error) {
      // do nothing
    }

    this.setState({
      rankStarForces
    })
    this.setStorage(undefined, undefined, namespace)
  }

  // -------------------- get --------------------
  @computed get short() {
    return systemStore.setting.xsbShort
  }

  @computed get namespaceLastAuction() {
    return `${namespace}|lastAuction|${this.monoId}`
  }

  @computed get namespaceLastSacrifice() {
    return `${namespace}|lastSacrifice|${this.monoId}`
  }

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
    return tinygrailStore.users(this.monoId)
  }

  @computed get myTemple() {
    const { list } = this.charaTemple
    return list.find(item => item.name === this.hash) || {}
  }

  /**
   * 测试献祭效率最少数量
   */
  @computed get testAmount() {
    const { sacrifices = 0 } = this.myTemple
    const { amount } = this.userLogs
    if (sacrifices >= 500) {
      return 1
    }
    return amount >= 100 ? 100 : amount
  }

  @computed get relation() {
    const XSBRelationData = getXsbRelationOTA()
    const { s, r = [] } = XSBRelationData.data[this.monoId] || {}
    return {
      s,
      subject: s ? XSBRelationData.name[s] : '',
      r: [Number(this.monoId), ...r]
    }
  }

  /**
   * 计算通天塔各分段等级需要的星之力在slider上面的位置
   */
  @computed get rankPercents() {
    const { rankStarForces } = this.state
    const { state = 0, rank = 0, rate, stars, starForces = 0 } = this.chara
    const { sacrifices = 0 } = this.userLogs
    const { assets = 0 } = this.myTemple
    const max = parseInt(assets || sacrifices)

    const data = []
    const currentRate = calculateRate(rate, rank, stars)
    const current = {
      left: 0,
      rank,
      text: formatNumber(starForces, 0),
      distance: 0,
      rate: toFixed(currentRate, 1),
      totalRate: (state + assets) * currentRate
    }

    const ranks = rank <= 100 ? [20, 40, 60, 80] : [100, 200, 300, 400, 500]
    ranks.forEach(r => {
      if (
        max &&
        rank > r &&
        rankStarForces[r] &&
        assets + starForces > rankStarForces[r]
      ) {
        const _rate = calculateRate(rate, r, stars)
        const distance = rankStarForces[r] - starForces + 1
        data.push({
          left: `${((rankStarForces[r] - starForces + 1) / max) * 100}%`,
          rank: r,
          text: decimal(rankStarForces[r]),
          distance, // 距离段位差多少星之力
          rate: toFixed(_rate, 1), // 打到段位可以提升多少生效股息
          totalRate: decimal((state + assets - distance) * _rate - current.totalRate)
        })
      }
    })

    data.push(current) // 当前

    return data
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
    feedback()

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
          } ${Value.Items.map(item => `「${item.Name}」×${item.Count}`).join(' ')}`,
      [
        {
          text: '知道了'
        }
      ]
    )
    this.setState({
      loading: false
    })
    this.cacheLastSacrifice(amount, Value.Balance)
    this.refresh(true)
  }

  /**
   * 测试献祭效率
   */
  doTestSacrifice = async () => {
    const { loading } = this.state
    if (loading) {
      return
    }

    this.setState({
      loading: true
    })

    t('资产重组.测试效率', {
      monoId: this.monoId,
      amount: this.testAmount
    })

    const { State, Value, Message } = await tinygrailStore.doSacrifice({
      monoId: this.monoId,
      amount: this.testAmount,
      isSale: false
    })
    feedback()

    if (State !== 0) {
      info(Message)
      this.setState({
        loading: false
      })
      return
    }

    this.setState({
      loading: false
    })
    this.cacheLastSacrifice(this.testAmount, Value.Balance)
    this.refresh(true)
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
    feedback()

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
    this.refresh(true)
  }

  /**
   * 灌注星之力
   */
  doStarForces = async () => {
    const { loading } = this.state
    if (loading) {
      return
    }

    this.setState({
      loading: true
    })

    const { starForcesValue } = this.state
    if (!starForcesValue) {
      info('请输入星之力数量')
      this.setState({
        loading: false
      })
      return
    }

    t('资产重组.灌注星之力', {
      monoId: this.monoId,
      amount: starForcesValue
    })

    const { State, Message } = await tinygrailStore.doStarForces({
      monoId: this.monoId,
      amount: starForcesValue
    })
    feedback()

    if (State !== 0) {
      info(Message)
      this.setState({
        loading: false
      })
      return
    }

    Alert.alert('小圣杯助手', '星之力转化完成', [
      {
        text: '知道了'
      }
    ])
    this.setState({
      loading: false,
      starForcesValue: 0
    })
    this.refresh()
  }

  doUse = async ({ title, monoId, toMonoId, amount, isTemple }) => {
    try {
      const type = ITEMS_TYPE[title]
      if (!type) {
        return false
      }

      const data = {
        monoId: monoId || this.monoId,
        type
      }
      if (toMonoId) data.toMonoId = toMonoId
      if (amount !== undefined) data.amount = amount
      if (isTemple !== undefined) data.isTemple = isTemple

      const { State, Value, Message } = await tinygrailStore.doMagic(data)
      feedback()
      t('资产重组.使用道具', {
        type: title,
        monoId: this.monoId,
        toMonoId
      })

      if (State === 0) {
        Alert.alert(
          '小圣杯助手',
          typeof Value === 'string'
            ? Value
            : `获得${Value.Name}x${Value.Amount}，当前价${toFixed(
                Value.CurrentPrice,
                2
              )}，价值${toFixed(Value.Amount * Value.CurrentPrice, 2)}`,
          [
            {
              text: '知道了'
            }
          ]
        )

        tinygrailStore.fetchUserLogs(monoId || this.monoId)
        if (title === '星光碎片') {
          tinygrailStore.batchUpdateTemplesByIds([monoId || this.monoId, toMonoId])
        }

        return tinygrailStore.batchUpdateMyCharaAssetsByIds(
          [monoId || this.monoId, toMonoId].filter(item => !!item)
        )
      }

      info(Message)
      return false
    } catch (error) {
      info('操作失败，可能授权过期了')
      return false
    }
  }

  // -------------------- page --------------------
  /**
   * 金额格式过滤
   */
  moneyNatural = v => {
    if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
      if (v === '.') return '0.'
      if (!v) return ''
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
    this.setState({
      auctionPrice: this.moneyNatural(value)
    })
  }

  /**
   * 竞拍数量改变
   */
  changeAuctionAmount = amount => {
    let _amount = parseInt(amount)

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
        this.changeAuctionAmount(Math.min(500 - sacrifices - userAmount, amount))
        return
      case '到2500':
        if (sacrifices + userAmount >= 2500) {
          info('已持有和献祭超过2500股')
          return
        }
        this.changeAuctionAmount(Math.min(2500 - sacrifices - userAmount, amount))
        return
      case '到12500':
        if (sacrifices + userAmount >= 12500) {
          info('已持有和献祭超过12500股')
          return
        }
        this.changeAuctionAmount(Math.min(12500 - sacrifices - userAmount, amount))
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
    let _value = parseFloat(this.moneyNatural(auctionPrice) || auctionPrice) - 0.1
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
    const _value = parseFloat(this.moneyNatural(auctionPrice) || auctionPrice) + 0.1

    this.setState({
      auctionPrice: toFixed(_value, 2)
    })
  }

  /**
   * 星之力改变
   */
  changeStarForces = starforces => {
    let _starforces = parseInt(starforces)

    if (isNaN(_starforces)) {
      _starforces = 0
    }

    this.setState({
      starForcesValue: _starforces
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
    const lastAuction = {
      price,
      amount,
      time: getTimestamp()
    }
    this.setState({
      lastAuction
    })

    setStorage(this.namespaceLastAuction, lastAuction)
  }

  /**
   * 记忆上次献祭
   */
  cacheLastSacrifice = (amount, total) => {
    const lastSacrifice = {
      amount,
      total,
      time: getTimestamp()
    }
    this.setState({
      lastSacrifice
    })

    setStorage(this.namespaceLastSacrifice, lastSacrifice)
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

  /**
   * 展开收起献祭模块
   */
  toggleSacrifice = () => {
    const { showSacrifice } = this.state
    this.setState({
      showSacrifice: !showSacrifice
    })
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 展开收起拍卖模块
   */
  toggleAuction = () => {
    const { showAuction } = this.state
    this.setState({
      showAuction: !showAuction
    })
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 展开收起星之力模块
   */
  toggleStarForces = () => {
    const { showStarForces } = this.state
    this.setState({
      showStarForces: !showStarForces
    })
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 展开收起道具模块
   */
  toggleItems = () => {
    const { showItems } = this.state
    this.setState({
      showItems: !showItems
    })
    this.setStorage(undefined, undefined, namespace)
  }
}
