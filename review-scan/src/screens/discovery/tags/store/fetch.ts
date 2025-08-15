/*
 * @Author: czy0729
 * @Date: 2024-08-18 05:55:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 05:57:07
 */
import { discoveryStore } from '@stores'
import { getTimestamp } from '@utils'
import { get, update } from '@utils/kv'
import { D7 } from '@constants'
import { SubjectType } from '@types'
import Computed from './computed'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED = []

export default class Fetch extends Computed {
  /** 标签 */
  fetchList = async (type: SubjectType, refresh: boolean = false) => {
    if (refresh) this.fetchThirdParty()

    const { filter } = this.state
    const data = await discoveryStore.fetchTags(
      {
        type,
        filter
      },
      refresh
    )

    if (
      data.list.length &&
      // 只有明确知道云快照没有这个 key 的数据, 才主动更新云快照数据
      this.thirdPartyKey in this.state.ota
    ) {
      const ts = this.ota?.ts || 0
      const _loaded = getTimestamp()
      if (_loaded - ts >= D7) this.updateThirdParty()
    }

    return data
  }

  /** 获取云快照 */
  fetchThirdParty = async () => {
    if (!this.ota && !this.list(this.type)._loaded) {
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
      update(this.thirdPartyKey, {
        list: this.list(this.type).list
      })
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }
}
