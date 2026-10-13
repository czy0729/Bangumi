/*
 * @Author: czy0729
 * @Date: 2024-08-20 14:23:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 频道派生: 条目类型 / 云快照 / 聚合数据
 */
import { computed } from 'mobx'
import { discoveryStore } from '@stores'
import { HTML_CHANNEL, MODEL_SUBJECT_TYPE } from '@constants'
import State from './state'

import type { Channel } from '@stores/discovery/types'
import type { SubjectTypeCn } from '@types'

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
    if (channel._loaded) return channel

    // 接口未加载完成时优先使用云快照, 并补全云快照缺失的字段
    return {
      ...channel,
      ...this.ota
    }
  }

  @computed get url() {
    return HTML_CHANNEL(this.type)
  }

  /** 云快照对应的频道标识 */
  @computed get thirdPartyKey() {
    return `channel_v2_${this.type}`
  }

  @computed get hm() {
    return [this.url, 'Channel'] as const
  }
}
