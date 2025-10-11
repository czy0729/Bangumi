/*
 * @Author: czy0729
 * @Date: 2024-08-20 14:23:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-03 21:08:21
 */
import { computed } from 'mobx'
import { collectionStore, discoveryStore } from '@stores'
import { Channel } from '@stores/discovery/types'
import { HTML_CHANNEL, MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import State from './state'

export default class Computed extends State {
  @computed get type() {
    return this.state.type || this.params.type || 'anime'
  }

  @computed get typeCn() {
    return MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(this.type)
  }

  /** 云快照 */
  @computed get ota() {
    return this.state.ota[this.thirdPartyKey]
  }

  /** 频道聚合 */
  @computed get channel(): Channel {
    const channel = discoveryStore.channel(this.type)
    if (!channel._loaded) return this.ota || { _loaded: 0 }

    return channel
  }

  @computed get url() {
    return HTML_CHANNEL(this.type)
  }

  @computed get userCollectionsMap() {
    return collectionStore.userCollectionsMap
  }

  @computed get thirdPartyKey() {
    return `channel_v2_${this.type}`
  }

  @computed get hm() {
    return [this.url, 'Channel']
  }
}
