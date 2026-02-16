/*
 * @Author: czy0729
 * @Date: 2024-05-19 08:33:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-28 22:40:50
 */
import { tinygrailStore } from '@stores'
import {
  alert,
  feedback,
  formatNumber,
  getTimestamp,
  info,
  queue,
  setStorage,
  toFixed
} from '@utils'
import { t } from '@utils/fetch'
import { ITEMS_TYPE } from '@tinygrail/_/characters-modal'
import { AnyObject } from '@types'
import { AuctionsSort, TemplesSort, UsersSort } from '../types'
import Fetch from './fetch'

export default class Action extends Fetch {
  refresh = () => {
    return queue([
      this.fetchCharacters,
      this.fetchUserLogs,
      this.fetchMyTemple,
      this.fetchAssets,
      this.fetchAuctionStatus,
      this.updateMyCharaAssets
    ])
  }

  refreshAll = async () => {
    await this.refresh()

    return queue([
      this.fetchIssuePrice,
      this.fetchCharaTemple,
      this.fetchValhallChara,
      this.fetchAuctionList,
      this.fetchUsers,
      this.fetchCharaPool,
      this.fetchStarForcesRankValues,
      this.fetchTopWeek
    ])
  }

  /** 资产重组 */
  doSacrifice = async () => {
    if (this.state.loading) return

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
    this.refresh()
  }

  /** 测试献祭效率 */
  doTestSacrifice = async () => {
    if (this.state.loading) return

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
    this.refresh()
  }

  /** 竞拍 */
  doAuction = async () => {
    if (this.state.auctionLoading) return

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
    this.refresh()
  }

  /** 灌注星之力 */
  doStarForces = async () => {
    if (this.state.loading) return

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
    if (this.state.loadingRefine) return

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
  private prev = 0

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

  /** 唯一圣殿封面 */
  toggleUnique = () => {
    const { unique } = this.state
    t('资产重组.唯一圣殿', {
      unique: !unique
    })

    this.setState({
      unique: !unique
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
    this.setState({
      isSale: !this.state.isSale
    })
  }

  /** 切换是否二次确认精炼 */
  switchConfirmRefine = () => {
    this.setState({
      confirmRefine: !this.state.confirmRefine
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
    this.setState({
      showSacrifice: !this.state.showSacrifice
    })
    this.save()
  }

  /** 展开收起拍卖模块 */
  toggleAuction = () => {
    this.setState({
      showAuction: !this.state.showAuction
    })
    this.save()
  }

  /** 展开收起星之力模块 */
  toggleStarForces = () => {
    this.setState({
      showStarForces: !this.state.showStarForces
    })
    this.save()
  }

  /** 展开收起精炼模块 */
  toggleRefine = () => {
    this.setState({
      showRefine: !this.state.showRefine
    })
    this.save()
  }

  /** 展开收起道具模块 */
  toggleItems = () => {
    this.setState({
      showItems: !this.state.showItems
    })
    this.save()
  }

  /** 竞拍记录排序 */
  selectAuctionsSort = (auctionsSort: AuctionsSort) => {
    this.setState({
      auctionsSort
    })
    this.save()
  }

  /** 圣殿排序 */
  selectTemplesSort = (templesSort: TemplesSort) => {
    this.setState({
      templesSort
    })
    this.save()
  }

  /** 董事会排序 */
  selectUsersSort = (usersSort: UsersSort) => {
    this.setState({
      usersSort
    })
    this.save()
  }
}
