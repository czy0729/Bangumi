/*
 * @Author: czy0729
 * @Date: 2024-08-27 10:17:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-19 16:56:42
 */
import { monoStore } from '@stores'
import { getTimestamp } from '@utils'
import { get, update } from '@utils/kv'
import { D7 } from '@constants'
import Computed from './computed'

import type { SnapshotId } from '../types'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED = new Map<SnapshotId, true>()

export default class Fetch extends Computed {
  /** 更多制作人员 */
  fetchPersons = async () => {
    this.fetchThirdParty()

    const data = await monoStore.fetchPersons(this.subjectId)
    if (data.list.length && this.hasThirdPartyData) {
      if (this.isThirdPartyExpired) this.updateThirdParty()
    }

    return data
  }

  /** 获取云快照 */
  fetchThirdParty = async () => {
    if (this.ota || this.persons._loaded) return

    const data = await get(this.thirdPartyKey)

    // 即使没有数据，也要占位，用于后续判断是否需要回写
    this.setState({
      ota: {
        [this.thirdPartyKey]: {
          ...(data || {
            list: []
          }),
          _loaded: data ? getTimestamp() : 0
        }
      }
    })
  }

  /** 上传预数据 */
  updateThirdParty = async () => {
    if (THIRD_PARTY_UPDATED.has(this.thirdPartyKey)) return

    setTimeout(() => {
      update(this.thirdPartyKey, {
        list: this.persons.list
      })

      THIRD_PARTY_UPDATED.set(this.thirdPartyKey, true)
    }, 0)
  }

  /** 是否存在云快照数据 */
  private get hasThirdPartyData() {
    return this.thirdPartyKey in (this.state.ota || {})
  }

  /** 云快照是否超过 7 天 */
  private get isThirdPartyExpired() {
    return getTimestamp() - Number(this.ota?._loaded || 0) >= D7
  }
}
