/*
 * @Author: czy0729
 * @Date: 2019-09-01 00:36:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-25 21:02:47
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'

export const m1 = 60 * 1000
export const m5 = m1 * 5
export const m15 = m1 * 15
export const h1 = m1 * 60
export const h4 = h1 * 4
export const h12 = h1 * 12
export const d1 = h1 * 24
export const w1 = d1 * 7
export const month1 = d1 * 30

const namespace = 'ScreenTinygrailTrade'

export default class ScreenTinygrailTrade extends store {
  state = observable({
    loading: true, // K线是否加载中
    distance: h4,
    _loaded: false // 本地数据读取完成
  })

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state,
      loading: true,
      _loaded: true
    })

    this.fetchChara()
    this.fetchKline()
    this.fetchDepth()
  }

  fetchChara = () => tinygrailStore.fetchCharacters([this.monoId])

  fetchKline = () => {
    const { distance } = this.state
    return tinygrailStore.fetchKline(this.monoId, distance)
  }

  fetchDepth = () => tinygrailStore.fetchDepth(this.monoId)

  // -------------------- get --------------------
  @computed get monoId() {
    const { monoId = '' } = this.params
    return monoId.replace('character/', '')
  }

  @computed get chara() {
    return tinygrailStore.characters(this.monoId)
  }

  @computed get kline() {
    const { distance } = this.state
    return tinygrailStore.kline(this.monoId, distance)
  }

  @computed get depth() {
    return tinygrailStore.depth(this.monoId)
  }

  // -------------------- page --------------------
  /**
   * 切换K线时间间隔
   */
  changeDistance = distance => {
    this.setState({
      distance
    })
    this.setStorage(undefined, undefined, namespace)
  }

  // -------------------- action --------------------
}
