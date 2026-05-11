/*
 * @Author: czy0729
 * @Date: 2024-05-19 08:23:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-11 10:00:00
 */
import { monoStore, subjectStore, tinygrailStore } from '@stores'
import { getTimestamp, toFixed } from '@utils'
import { xhrCustom } from '@utils/fetch'
import { API_TINYGRAIL_STAR, D7, M5 } from '@constants'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 预测股息 */
  fetchTest = () =>
    this.withFocus(
      () => tinygrailStore.fetchTest(),
      '0 股息预测',
      !(this.test._loaded && getTimestamp() - Number(this.test._loaded) < D7)
    )

  /** 角色小圣杯信息 */
  fetchCharacters = () =>
    this.withFocus(() => tinygrailStore.fetchCharacters([this.monoId]), '1 角色小圣杯信息')

  /** 角色发行价 */
  fetchIssuePrice = () =>
    this.withFocus(() => tinygrailStore.fetchIssuePrice(this.monoId), '2 角色发行价')

  /** 本角色我的交易信息 */
  fetchUserLogs = () =>
    this.withFocus(() => tinygrailStore.fetchUserLogs(this.monoId), '3 本角色我的交易信息')

  /** 本角色我的圣殿 */
  fetchMyTemple = () =>
    this.withFocus(() => tinygrailStore.fetchMyTemple(this.monoId), '4 本角色我的圣殿')

  /** 所有人固定资产 (可以得到自己的可用资产) */
  fetchCharaTemple = () =>
    this.withFocus(() => tinygrailStore.fetchCharaTemple(this.monoId), '5 所有人固定资产')

  /** 自己的资产 */
  fetchAssets = () => this.withFocus(() => tinygrailStore.fetchAssets(), '6 自己的资产')

  /** 本次拍卖信息 */
  fetchValhallChara = () =>
    this.withFocus(async () => {
      try {
        const { price } = await tinygrailStore.fetchValhallChara(this.monoId)
        if (price) {
          this.setState({
            auctionPrice: toFixed(price + 0.01, 2)
          })
        }
      } catch {}
      return true
    }, '7 本次拍卖信息')

  /** 当前拍卖状态 */
  fetchAuctionStatus = () =>
    this.withFocus(() => tinygrailStore.fetchAuctionStatus(this.monoId), '8 当前拍卖状态')

  /** 上周拍卖信息 */
  fetchAuctionList = () =>
    this.withFocus(() => tinygrailStore.fetchAuctionList(this.monoId), '9 上周拍卖信息')

  /** 董事会 */
  fetchUsers = () => this.withFocus(() => tinygrailStore.fetchUsers(this.monoId), '10 董事会')

  /** 角色奖池 */
  fetchCharaPool = () =>
    this.withFocus(() => tinygrailStore.fetchCharaPool(this.monoId), '11 角色奖池')

  /** 通天塔 */
  fetchStarForcesRankValues = async () => {
    const { _loaded } = this.state.rankStarForces
    if (_loaded && Number(this.state._loaded) - _loaded <= M5) return

    return this.withFocus(async () => {
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
      } catch {}

      this.setState({
        rankStarForces
      })
      this.save()
    }, '12 通天塔')
  }

  /** 本周萌王信息 */
  fetchTopWeek = () => this.withFocus(() => tinygrailStore.fetchTopWeek(), '13 本周萌王信息')

  /** 画集数 */
  fetchPicTotal = () =>
    this.withFocus(
      () => monoStore.fetchPicTotal(this.name),
      '14 画集',
      !monoStore.picTotal(this.name)
    )

  /** 更新我的资产 */
  updateMyCharaAssets = () =>
    this.withFocus(() => {
      const { amount = 0, sacrifices = 0 } = this.userLogs
      return tinygrailStore.updateMyCharaAssets(this.monoId, amount, sacrifices)
    }, '14 更新我的资产')

  /** 获取人物信息 */
  fetchMono = () =>
    this.withFocus(
      () => subjectStore.fetchMono(`character/${this.chara?.monoId}`),
      '15 人物信息',
      !((this.chara.subjectName && this.chara.subjectId) || this.mono._loaded)
    )

  /** 每个请求都判断 this.state.focused 判断用户在未请求完就退出页面需要尽快终止余下请求 */
  private withFocus<T>(fn: () => T, desc: string = '', extraCondition: boolean = true) {
    if (!this.state.focused) {
      this.warn('withFocus', 'cancel', `(${desc})`)
      return
    }

    if (!extraCondition) {
      this.warn('withFocus', 'extraCondition cancel', `(${desc})`)
      return
    }

    this.log(desc)
    return fn()
  }
}
