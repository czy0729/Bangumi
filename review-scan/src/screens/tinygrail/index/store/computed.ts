/*
 * @Author: czy0729
 * @Date: 2024-12-29 11:12:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-29 11:13:49
 */
import { computed } from 'mobx'
import { systemStore, tinygrailStore, userStore } from '@stores'
import { ListKey } from '@stores/tinygrail/types'
import State from './state'

export default class Computed extends State {
  @computed get short() {
    return systemStore.setting.xsbShort
  }

  @computed get userCookie() {
    return userStore.userCookie
  }

  @computed get advance() {
    return systemStore.advance
  }

  @computed get userInfo() {
    return userStore.userInfo
  }

  @computed get hash() {
    return tinygrailStore.hash
  }

  @computed get assets() {
    return tinygrailStore.assets
  }

  @computed get charaAssets() {
    return tinygrailStore.charaAssets(this.hash)
  }

  @computed get total() {
    return this.assets.assets
  }

  /** 当次刮刮乐的价格 */
  @computed get currentPrice() {
    const { count = 0, isBonus2 } = this.state
    return isBonus2 ? 2000 * 2 ** (count - 1) : 1000
  }

  /** 幻想乡刮刮乐下一次的价格 (每次翻倍) */
  @computed get nextPrice() {
    const { count = 0, isBonus2 } = this.state
    return isBonus2 ? 2000 * 2 ** count : 1000
  }

  list(key: ListKey = 'bid') {
    return computed(() => tinygrailStore.list(key)).get()
  }
}
