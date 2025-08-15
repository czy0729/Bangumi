/*
 * @Author: czy0729
 * @Date: 2024-08-20 14:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-20 17:36:29
 */
import { discoveryStore } from '@stores'
import { getTimestamp, omit } from '@utils'
import { get, update } from '@utils/kv'
import { D } from '@constants'
import Computed from './computed'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED = []

export default class Fetch extends Computed {
  /** 频道聚合 */
  fetchChannel = async () => {
    this.fetchThirdParty()

    const data = await discoveryStore.fetchChannel({
      type: this.type
    })

    if (
      data &&
      // 只有明确知道云快照没有这个 key 的数据, 才主动更新云快照数据
      this.thirdPartyKey in this.state.ota
    ) {
      const ts = this.ota?.ts || 0
      const _loaded = getTimestamp()
      if (_loaded - ts >= D) this.updateThirdParty()
    }

    return data
  }

  /** 获取云快照 */
  fetchThirdParty = async () => {
    if (!this.ota && !this.channel._loaded) {
      const data = await get(this.thirdPartyKey)
      if (!data) {
        // 就算没有数据也插入 key, 用于判断是否需要更新云数据
        this.setState({
          ota: {
            [this.thirdPartyKey]: {
              list: [],
              _loaded: 0
            }
          }
        })
        return
      }

      this.setState({
        ota: {
          [this.thirdPartyKey]: {
            ...data,
            _loaded: getTimestamp()
          }
        }
      })
    }
  }

  /** 上传预数据 */
  updateThirdParty = async () => {
    if (THIRD_PARTY_UPDATED.includes(this.thirdPartyKey)) return

    setTimeout(() => {
      update(this.thirdPartyKey, omit(this.channel, ['friends', '_loaded']))
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }
}
