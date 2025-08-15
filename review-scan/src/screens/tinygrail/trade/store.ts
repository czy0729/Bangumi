/*
 * @Author: czy0729
 * @Date: 2019-09-01 00:36:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 06:23:24
 */
import { computed, observable } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import { queue, t } from '@utils/fetch'
import store from '@utils/store'
import { MonoId } from '@types'
import { d1, h1, h12, h4, m1, m15, m5, month1, NAMESPACE, STATE, w1 } from './ds'
import { Params } from './types'

export { m1, m5, m15, h1, h4, h12, d1, w1, month1 }

export default class ScreenTinygrailTrade extends store<typeof STATE> {
  params: Params

  state = observable(STATE)

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
      return queue([() => this.fetchChara(), () => this.fetchKline(), () => this.fetchDepth()])
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
    this.saveStorage(NAMESPACE)
  }
}
