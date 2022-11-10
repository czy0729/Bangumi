/*
 * @Author: czy0729
 * @Date: 2019-09-01 00:36:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 02:32:11
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { queue, t } from '@utils/fetch'
import { Params } from './types'
import { MonoId } from '@types'

export const m1 = 60 * 1000
export const m5 = m1 * 5
export const m15 = m1 * 15
export const h1 = m1 * 60
export const h4 = h1 * 4
export const h12 = h1 * 12
export const d1 = h1 * 24
export const w1 = d1 * 7
export const month1 = d1 * 30

const NAMESPACE = 'ScreenTinygrailTrade'

export default class ScreenTinygrailTrade extends store {
  params: Params

  state = observable({
    /** K 线是否加载中 */
    loading: true,
    distance: d1,
    _loaded: false
  })

  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60

    const state = (await this.getStorage(undefined, NAMESPACE)) || {}
    this.setState({
      ...state,
      loading: true,
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) {
      return queue([
        () => this.fetchChara(),
        () => this.fetchKline(),
        () => this.fetchDepth()
      ])
    }
    return true
  }

  /** 人物数据 */
  fetchChara = () => {
    return tinygrailStore.fetchCharacters([this.monoId])
  }

  /** K 线原始数据 */
  fetchKline = () => {
    return tinygrailStore.fetchKline(this.monoId)
  }

  /** 深度图 */
  fetchDepth = () => {
    return tinygrailStore.fetchDepth(this.monoId)
  }

  // -------------------- get --------------------
  @computed get monoId() {
    const { monoId = '' } = this.params
    return monoId.replace('character/', '') as MonoId
  }

  /** 全局人物数据 */
  @computed get chara() {
    return tinygrailStore.characters(this.monoId)
  }

  /** K 线 */
  @computed get kline() {
    return tinygrailStore.kline(this.monoId)
  }

  /** 深度图 */
  @computed get depth() {
    return tinygrailStore.depth(this.monoId)
  }

  // -------------------- page --------------------
  /** 切换 K 线时间间隔 */
  changeDistance = (distance: number) => {
    t('K线.间隔', {
      distance
    })

    this.setState({
      distance
    })
    this.setStorage(NAMESPACE)
  }
}
