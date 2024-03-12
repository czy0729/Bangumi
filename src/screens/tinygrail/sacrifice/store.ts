/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:11:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-12 07:04:39
 */
import { computed, observable } from 'mobx'
import { systemStore, tinygrailStore } from '@stores'
import {
  alert,
  feedback,
  formatNumber,
  getStorage,
  getTimestamp,
  info,
  setStorage,
  toFixed
} from '@utils'
import { queue, t, xhrCustom } from '@utils/fetch'
import store from '@utils/store'
import { API_TINYGRAIL_STAR, getXsbRelationOTA } from '@constants'
import { ITEMS_TYPE } from '@tinygrail/_/characters-modal'
import { calculateRate, decimal } from '@tinygrail/_/utils'
import { AnyObject, MonoId } from '@types'
import { EXCLUDE_STATE, INIT_LAST_AUCTION, INIT_LAST_SACRIFICE, NAMESPACE, STATE } from './ds'
import { Params } from './types'

export default class ScreenTinygrailSacrifice extends store<typeof STATE> {
  params: Params

  state = observable(STATE)

  prev: any = 0

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    const lastAuction = (await getStorage(this.namespaceLastAuction)) || INIT_LAST_AUCTION
    const lastSacrifice = (await getStorage(this.namespaceLastSacrifice)) || INIT_LAST_SACRIFICE
    await tinygrailStore.init('test')

    const current = getTimestamp()
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
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

  refresh = async (update: boolean = false) => {
    if (!update) {
      return queue([
        this.fetchTest,

        /** 角色小圣杯信息 */
        () => tinygrailStore.fetchCharacters([this.monoId]),

        /** 所有人固定资产 (可以得到自己的可用资产) */
        () => tinygrailStore.fetchCharaTemple(this.monoId),

        /** 本角色我的交易信息 */
        () => tinygrailStore.fetchUserLogs(this.monoId),

        /** 自己的资产 */
        () => tinygrailStore.fetchAssets(),

        /** 角色发行价 */
        () => tinygrailStore.fetchIssuePrice(this.monoId),

        /** 本次拍卖信息 */
        () => this.fetchValhallChara(),

        /** 当前拍卖状态 */
        () => tinygrailStore.fetchAuctionStatus(this.monoId),

        /** 上周拍卖信息 */
        () => tinygrailStore.fetchAuctionList(this.monoId),

        /** 董事会 */
        () => tinygrailStore.fetchUsers(this.monoId),

        /** 角色奖池 */
        () => tinygrailStore.fetchCharaPool(this.monoId)
      ])
    }

    await queue([
      /** 本角色我的交易信息 */
      () => tinygrailStore.fetchUserLogs(this.monoId),

      /** 自己的资产 */
      () => tinygrailStore.fetchAssets(),

      /** 当前拍卖状态 */
      () => tinygrailStore.fetchAuctionStatus(this.monoId)
    ])

    // 更新我的资产
    const { amount = 0, sacrifices = 0 } = this.userLogs
    return tinygrailStore.updateMyCharaAssets(this.monoId, amount, sacrifices)
  }

  save = () => {
    this.setStorage(NAMESPACE)
  }

  /** 预测股息 */
  fetchTest = () => {
    if (this.test._loaded && getTimestamp() - Number(this.test._loaded) < 60 * 60 * 24 * 7) {
      return true
    }
    return tinygrailStore.fetchTest()
  }

  /** 可拍卖信息 */
  fetchValhallChara = async () => {
    let res: any
    try {
      res = tinygrailStore.fetchValhallChara(this.monoId)
      const { price } = await res
      if (price) {
        this.setState({
          auctionPrice: toFixed(price + 0.01, 2)
        })
      }
    } catch (error) {}
    return res
  }

  /** 通天塔(β) */
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
    } catch (error) {}

    this.setState({
      rankStarForces
    })
    this.save()
  }

  // -------------------- get --------------------
  @computed get monoId() {
    const { monoId = '' } = this.params
    return monoId.replace('character/', '') as MonoId
  }

  /** 小圣杯缩短资金数字显示 */
  @computed get short() {
    return systemStore.setting.xsbShort
  }

  @computed get namespaceLastAuction() {
    return `${NAMESPACE}|lastAuction|${this.monoId}`
  }

  @computed get namespaceLastSacrifice() {
    return `${NAMESPACE}|lastSacrifice|${this.monoId}`
  }

  /** 用户唯一标识 */
  @computed get hash() {
    return tinygrailStore.hash
  }

  /** 预测股息 */
  @computed get test() {
    return tinygrailStore.test
  }

  /** 全局人物数据 */
  @computed get chara() {
    return tinygrailStore.characters(this.monoId)
  }

  /** 我的挂单和交易记录 */
  @computed get userLogs() {
    return tinygrailStore.userLogs(this.monoId)
  }

  /** 角色圣殿 */
  @computed get charaTemple() {
    return tinygrailStore.charaTemple(this.monoId)
  }

  /** 用户资产 */
  @computed get assets() {
    return tinygrailStore.assets
  }

  /** 可拍卖信息 */
  @computed get valhallChara() {
    return tinygrailStore.valhallChara(this.monoId)
  }

  /** 上周拍卖记录 */
  @computed get auctionList() {
    return tinygrailStore.auctionList(this.monoId)
  }

  /** 当前拍卖状态 */
  @computed get auctionStatus() {
    return tinygrailStore.auctionStatus(this.monoId)
  }

  /** 角色发行价 */
  @computed get issuePrice() {
    return tinygrailStore.issuePrice(this.monoId)
  }

  /** 董事会 */
  @computed get users() {
    return tinygrailStore.users(this.monoId)
  }

  /** 角色奖池 */
  @computed get charaPool() {
    return tinygrailStore.charaPool(this.monoId)
  }

  /** 我的圣殿 */
  @computed get myTemple() {
    const { list } = this.charaTemple
    return list.find(item => item.name === this.hash) || {}
  }

  /** 测试献祭效率最少数量 */
  @computed get testAmount() {
    const { sacrifices = 0 } = this.myTemple
    const { amount } = this.userLogs
    if (sacrifices >= 500) return 1
    return amount >= 100 ? 100 : amount
  }

  /** 关联角色数据 */
  @computed get relation() {
    const XSBRelationData = getXsbRelationOTA()
    const { s, r = [] } = XSBRelationData.data[this.monoId] || {}
    return {
      s,
      subject: s ? XSBRelationData.name[s] : '',
      r: [Number(this.monoId), ...r]
    }
  }

  /** 计算通天塔各分段等级需要的星之力在 slider 上面的位置 */
  @computed get rankPercents() {
    const { rankStarForces } = this.state
    const { state = 0, rank = 0, rate, stars, starForces = 0 } = this.chara
    const { sacrifices = 0 } = this.userLogs
    const { assets = 0 } = this.myTemple
    const max = Number(assets || sacrifices)

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
    ranks.forEach((r, index) => {
      if (max && rank > r && rankStarForces[r] && assets + starForces > rankStarForces[r]) {
        const _rate = calculateRate(rate, r, stars)
        const distance = rankStarForces[r] - starForces + 1
        data.push({
          left: `${Math.min(40 - index * 2, ((rankStarForces[r] - starForces + 1) / max) * 100)}%`,
          rank: r,
          text: decimal(rankStarForces[r]),

          /** 距离段位差多少星之力 */
          distance,

          /** 达到该段位可以提升多少生效股息 */
          rate: toFixed(_rate, 1),
          totalRate: decimal((state + assets - distance) * _rate - current.totalRate)
        })
      }
    })
    data.push(current) // 当前

    return data
  }

  // -------------------- action --------------------
  /** 资产重组 */
  doSacrifice = async () => {
    const { loading } = this.state
    if (loading) return

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

    alert(
      isSale
        ? `融资完成！获得资金 ${formatNumber(Value.Balance)}`
        : `融资完成！获得资金 ${formatNumber(Value.Balance)} ${
            Value.Items.length ? '掉落道具' : ''
          } ${Value.Items.map(
            (item: { Name: any; Count: any }) => `「${item.Name}」×${item.Count}`
          ).join(' ')}`,
      '小圣杯助手'
    )
    this.setState({
      loading: false
    })
    this.cacheLastSacrifice(amount, Value.Balance)
    this.refresh(true)
  }

  /** 测试献祭效率 */
  doTestSacrifice = async () => {
    const { loading } = this.state
    if (loading) return

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

  /** 竞拍 */
  doAuction = async () => {
    const { auctionLoading } = this.state
    if (auctionLoading) return

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

  /** 灌注星之力 */
  doStarForces = async () => {
    const { loading } = this.state
    if (loading) return

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

    alert('星之力转化完成', '小圣杯助手')
    this.setState({
      loading: false,
      starForcesValue: 0
    })
    this.refresh()
  }

  /** 使用道具 */
  doUse = async ({ title, monoId, toMonoId, amount, isTemple }: any) => {
    try {
      const type = ITEMS_TYPE[title]
      if (!type) return false

      const data: AnyObject = {
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
        alert(
          typeof Value === 'string'
            ? Value
            : `获得${Value.Name}x${Value.Amount}，当前价${toFixed(
                Value.CurrentPrice,
                2
              )}，价值${toFixed(Value.Amount * Value.CurrentPrice, 2)}`,
          '小圣杯助手'
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

  /** 精炼 */
  doRefine = async () => {
    const { loadingRefine } = this.state
    if (loadingRefine) return

    this.setState({
      loadingRefine: true
    })

    const { Value, Message } = await tinygrailStore.doMagic({
      monoId: this.monoId,
      type: 'refine'
    })
    feedback()
    t('资产重组.使用道具', {
      type: '精炼',
      monoId: this.monoId
    })

    info(Message || Value)
    this.setState({
      loadingRefine: false
    })
    tinygrailStore.fetchCharaTemple(this.monoId)
  }

  // -------------------- page --------------------
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

  /** 数量改变 */
  changeAmount = (amount: any) => {
    let _amount = parseInt(amount)
    if (isNaN(_amount)) _amount = 0
    this.setState({
      amount: _amount
    })
  }

  /** 竞拍价钱改变 */
  changeAuctionPrice = (value: any) => {
    this.setState({
      auctionPrice: this.moneyNatural(value)
    })
  }

  /** 竞拍数量改变 */
  changeAuctionAmount = (amount: any) => {
    let _amount = parseInt(amount)
    if (isNaN(_amount)) _amount = 0
    this.setState({
      auctionAmount: _amount
    })
  }

  /** 菜单选择改变竞拍数量 */
  changeAuctionAmountByMenu = (title: string) => {
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

  /** 减少 */
  stepMinus = () => {
    const { auctionPrice } = this.state
    let _value = parseFloat(this.moneyNatural(auctionPrice) || auctionPrice) - 0.1
    if (_value < 0) _value = 1
    this.setState({
      auctionPrice: toFixed(_value, 2)
    })
  }

  /** 增加 */
  stepPlus = () => {
    const { auctionPrice } = this.state
    const _value = parseFloat(this.moneyNatural(auctionPrice) || auctionPrice) + 0.1
    this.setState({
      auctionPrice: toFixed(_value, 2)
    })
  }

  /** 星之力改变 */
  changeStarForces = (starforces: any) => {
    let _starforces = parseInt(starforces)
    if (isNaN(_starforces)) _starforces = 0
    this.setState({
      starForcesValue: _starforces
    })
  }

  /** 展开/收起所有圣殿 */
  toggleExpand = () => {
    const { expand } = this.state
    t('资产重组.展开收起圣殿', {
      expand: !expand
    })

    this.setState({
      expand: !expand
    })
  }

  /** 记忆上次出价 */
  cacheLastAuction = (price: string | number, amount: number) => {
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

  /** 记忆上次献祭 */
  cacheLastSacrifice = (amount: number, total: any) => {
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

  /** 切换股权融资 */
  switchIsSale = () => {
    const { isSale } = this.state
    this.setState({
      isSale: !isSale
    })
  }

  /** 切换是否二次确认精炼 */
  switchConfirmRefine = () => {
    const { confirmRefine } = this.state
    this.setState({
      confirmRefine: !confirmRefine
    })
    this.save()
  }

  /** 展开收起封面 */
  toggleCover = () => {
    const { showCover } = this.state
    t('资产重组.展开收起封面', {
      showCover: !showCover
    })

    this.setState({
      showCover: !showCover
    })
    this.save()
  }

  /** 展开收起记录 */
  toggleLogs = () => {
    const { showLogs } = this.state
    t('资产重组.展开收起记录', {
      showLogs: !showLogs
    })

    this.setState({
      showLogs: !showLogs
    })
    this.save()
  }

  /** 展开收起圣殿板块 */
  toggleTemples = () => {
    const { showTemples } = this.state
    t('资产重组.展开收起圣殿板块', {
      showTemples: !showTemples
    })

    this.setState({
      showTemples: !showTemples
    })
    this.save()
  }

  /** 展开收起董事会 */
  toggleUsers = () => {
    const { showUsers } = this.state
    t('资产重组.展开收起董事会', {
      showUsers: !showUsers
    })

    this.setState({
      showUsers: !showUsers
    })
    this.save()
  }

  /** 展开收起献祭模块 */
  toggleSacrifice = () => {
    const { showSacrifice } = this.state
    this.setState({
      showSacrifice: !showSacrifice
    })
    this.save()
  }

  /** 展开收起拍卖模块 */
  toggleAuction = () => {
    const { showAuction } = this.state
    this.setState({
      showAuction: !showAuction
    })
    this.save()
  }

  /** 展开收起星之力模块 */
  toggleStarForces = () => {
    const { showStarForces } = this.state
    this.setState({
      showStarForces: !showStarForces
    })
    this.save()
  }

  /** 展开收起精炼模块 */
  toggleRefine = () => {
    const { showRefine } = this.state
    this.setState({
      showRefine: !showRefine
    })
    this.save()
  }

  /** 展开收起道具模块 */
  toggleItems = () => {
    const { showItems } = this.state
    this.setState({
      showItems: !showItems
    })
    this.save()
  }
}
