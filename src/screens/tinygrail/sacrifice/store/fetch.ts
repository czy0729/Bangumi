/*
 * @Author: czy0729
 * @Date: 2024-05-19 08:23:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-19 16:56:02
 */
import { monoStore, subjectStore, tinygrailStore } from '@stores'
import { getTimestamp, toFixed } from '@utils'
import { xhrCustom } from '@utils/fetch'
import { API_TINYGRAIL_STAR, D7, M5 } from '@constants'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 预测股息 */
  fetchTest = () => {
    if (!this.state.mounted) return

    if (this.test._loaded && getTimestamp() - Number(this.test._loaded) < D7) {
      return true
    }

    this.log('0 股息预测')
    return tinygrailStore.fetchTest()
  }

  /** 角色小圣杯信息 */
  fetchCharacters = () => {
    if (!this.state.mounted) return

    this.log('1 角色小圣杯信息')
    return tinygrailStore.fetchCharacters([this.monoId])
  }

  /** 角色发行价 */
  fetchIssuePrice = () => {
    if (!this.state.mounted) return

    this.log('2 角色发行价')
    return tinygrailStore.fetchIssuePrice(this.monoId)
  }

  /** 本角色我的交易信息 */
  fetchUserLogs = () => {
    if (!this.state.mounted) return

    this.log('3 本角色我的交易信息')
    return tinygrailStore.fetchUserLogs(this.monoId)
  }

  /** 本角色我的圣殿 */
  fetchMyTemple = async () => {
    if (!this.state.mounted) return

    this.log('4 本角色我的圣殿')
    return tinygrailStore.fetchMyTemple(this.monoId)
  }

  /** 所有人固定资产 (可以得到自己的可用资产) */
  fetchCharaTemple = () => {
    if (!this.state.mounted) return

    this.log('5 所有人固定资产')
    return tinygrailStore.fetchCharaTemple(this.monoId)
  }

  /** 自己的资产 */
  fetchAssets = () => {
    if (!this.state.mounted) return

    this.log('6 自己的资产')
    return tinygrailStore.fetchAssets()
  }

  /** 本次拍卖信息 */
  fetchValhallChara = async () => {
    if (!this.state.mounted) return

    this.log('7 本次拍卖信息')
    try {
      const { price } = await tinygrailStore.fetchValhallChara(this.monoId)
      if (price) {
        this.setState({
          auctionPrice: toFixed(price + 0.01, 2)
        })
      }
    } catch (error) {}

    return true
  }

  /** 当前拍卖状态 */
  fetchAuctionStatus = async () => {
    if (!this.state.mounted) return

    this.log('8 当前拍卖状态')
    const data = await tinygrailStore.fetchAuctionStatus(this.monoId)
    return data
  }

  /** 上周拍卖信息 */
  fetchAuctionList = () => {
    if (!this.state.mounted) return

    this.log('9 上周拍卖信息')
    return tinygrailStore.fetchAuctionList(this.monoId)
  }

  /** 董事会 */
  fetchUsers = () => {
    if (!this.state.mounted) return

    this.log('10 董事会')
    return tinygrailStore.fetchUsers(this.monoId)
  }

  /** 角色奖池 */
  fetchCharaPool = () => {
    if (!this.state.mounted) return

    this.log('11 角色奖池')
    return tinygrailStore.fetchCharaPool(this.monoId)
  }

  /** 通天塔 */
  fetchStarForcesRankValues = async () => {
    if (!this.state.mounted) return

    const { _loaded } = this.state.rankStarForces
    if (_loaded && Number(this.state._loaded) - _loaded <= M5) return

    this.log('12 通天塔')
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

  /** 本周萌王信息 */
  fetchTopWeek = () => {
    if (!this.state.mounted) return

    this.log('13 本周萌王信息')
    return tinygrailStore.fetchTopWeek()
  }

  /** 画集数 */
  fetchPicTotal = async () => {
    if (!this.state.mounted || monoStore.picTotal(this.name)) return

    this.log('14 画集')
    return monoStore.fetchPicTotal(this.name)
  }

  /** 更新我的资产 */
  updateMyCharaAssets = () => {
    if (!this.state.mounted) return

    this.log('14 更新我的资产')
    const { amount = 0, sacrifices = 0 } = this.userLogs
    return tinygrailStore.updateMyCharaAssets(this.monoId, amount, sacrifices)
  }

  /** 获取人物信息 */
  fetchMono = async () => {
    if ((this.chara.subjectName && this.chara.subjectId) || this.mono._loaded) return true

    this.log('15 人物信息')
    return subjectStore.fetchMono({
      monoId: `character/${this.chara?.monoId}`
    })
  }
}
