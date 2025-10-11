/*
 * @Author: czy0729
 * @Date: 2024-12-28 05:27:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-28 05:29:52
 */
import { computed } from 'mobx'
import { systemStore, tinygrailStore } from '@stores'
import { getXsbRelationOTA } from '@constants'
import { MonoId } from '@types'
import State from './state'

export default class Computed extends State {
  /** 小圣杯缩短资金数字显示 */
  @computed get short() {
    return systemStore.setting.xsbShort
  }

  @computed get monoId() {
    const { monoId = '' } = this.params
    return monoId.replace('character/', '') as MonoId
  }

  /** 全局人物数据 */
  @computed get chara() {
    return tinygrailStore.characters(this.monoId)
  }

  /** 深度图 */
  @computed get depth() {
    return tinygrailStore.depth(this.monoId)
  }

  /** 用户资产 */
  @computed get assets() {
    return tinygrailStore.assets
  }

  /** 我的挂单和交易记录 */
  @computed get userLogs() {
    return tinygrailStore.userLogs(this.monoId)
  }

  /** 是否买入 */
  @computed get isBid() {
    return this.state.type === 'bid'
  }

  /** 当前可以买入的最大量 */
  @computed get max() {
    const { value } = this.state
    if (this.isBid) return value == 0 ? 0 : Math.floor(this.assets.balance / Number(value))
    return this.userLogs.amount
  }

  /** 角色发行价 */
  @computed get issuePrice() {
    return tinygrailStore.issuePrice(this.monoId)
  }

  /** 关联角色 */
  @computed get relation() {
    const XSBRelationData = getXsbRelationOTA()
    const { s, r = [] } = XSBRelationData.data[this.monoId] || {}
    return {
      s,
      subject: s ? XSBRelationData.name[s] : '',
      r: [Number(this.monoId), ...r]
    }
  }
}
