/*
 * @Author: czy0729
 * @Date: 2024-05-19 08:09:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-19 17:11:11
 */
import { computed } from 'mobx'
import { subjectStore, systemStore, tinygrailStore } from '@stores'
import { asc, formatNumber, toFixed } from '@utils'
import { getXsbRelationOTA, HOST } from '@constants'
import { calculateRate, decimal } from '@tinygrail/_/utils'
import { MonoId } from '@types'
import State from './state'
import { NAMESPACE } from './ds'

export default class Computed extends State {
  /** 角色数字 ID */
  @computed get monoId() {
    const { monoId = '' } = this.params
    return monoId.replace('character/', '') as MonoId
  }

  /** 全局人物数据 */
  @computed get chara() {
    return tinygrailStore.characters(this.monoId)
  }

  /** 角色 ID */
  @computed get id() {
    return (this.chara.id || this.params._props?.id || this.monoId || 0) as number
  }

  /** 角色名 */
  @computed get name() {
    return this.chara.name || this.params._props?.name
  }

  /** 角色新番加成 (周) */
  @computed get bonus() {
    return this.chara.bonus || this.params._props?.bonus
  }

  /** 角色等级 */
  @computed get level() {
    return this.chara.level === undefined ? this.params._props?.level : this.chara.level
  }

  /** 角色通天塔等级 */
  @computed get rank() {
    return this.chara.rank || this.params._props?.rank || 0
  }

  /** 角色基本股息 */
  @computed get rate() {
    return this.chara.rate || this.params._props?.rate
  }

  /** 角色头像 */
  @computed get icon() {
    return this.chara.icon || this.params._props?.icon
  }

  /** 角色总市值 */
  @computed get marketValue() {
    return this.chara.marketValue || this.params._props?.marketValue
  }

  /** 角色当前价 */
  @computed get current() {
    return this.chara.current || this.params._props?.current
  }

  /** 角色发行量 */
  @computed get total() {
    return this.chara.total || this.params._props?.total
  }

  /** 角色涨跌幅 */
  @computed get fluctuation() {
    return this.chara.fluctuation || this.params._props?.fluctuation
  }

  /** 角色通天塔星星 */
  @computed get stars() {
    return this.chara.stars || this.params._props?.stars
  }

  /** 角色通天塔星之力 */
  @computed get starForces() {
    return this.chara.starForces || this.params._props?.starForces || 0
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
    const find = this.charaTemple.list.find(item => item.name === this.hash)
    if (find) return find

    return tinygrailStore.myTemple(this.monoId)
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
    const { sacrifices = 0, assets = 0 } = this.myTemple
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

  /** 本周萌王 */
  @computed get topWeek() {
    return tinygrailStore.topWeek.list.find(item => item.id === this.id) || {}
  }

  @computed get mono() {
    return subjectStore.mono(`character/${this.chara.monoId}`)
  }

  @computed get job() {
    if (!this.mono?.jobs) return null

    return this.mono.jobs.slice().sort((a, b) => asc(a.cast, b.cast))[0]
  }

  @computed get subjectName() {
    if (this.chara.subjectName) return this.chara.subjectName

    if (!this.job) return ''

    return this.job.nameCn || this.job.name || ''
  }

  @computed get subjectHref() {
    if (this.chara.subjectId) return `${HOST}/subject/${this.chara.subjectId}`

    if (!this.job) return ''

    return this.job.href
  }

  @computed get subjectCast() {
    if (!this.job) return null

    const { cast, castHref } = this.job
    if (!cast && !castHref) return null

    return {
      name: cast,
      href: castHref
    }
  }
}
