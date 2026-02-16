/*
 * @Author: czy0729
 * @Date: 2024-05-24 10:13:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-25 04:18:15
 */
import { collectionStore, tagStore } from '@stores'
import { getTimestamp } from '@utils'
import { get, update } from '@utils/kv'
import { D7 } from '@constants'
import { SnapshotId } from '../types'
import Computed from './computed'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED: SnapshotId[] = []

export default class Fetch extends Computed {
  /** 获取排行榜 */
  fetchRank = async () => {
    this.fetchThirdParty()
    const data = await tagStore.fetchRank(this.query)

    if (
      data.list.length &&
      // 只有明确知道云快照没有这个 key 的数据, 才主动更新云快照数据
      this.thirdPartyKey in this.state.ota
    ) {
      const ts = this.ota?.ts || 0
      const _loaded = getTimestamp()
      if (_loaded - ts >= D7) this.updateThirdParty()
    }

    // 延迟获取收藏中的条目的具体收藏状态
    setTimeout(() => {
      collectionStore.fetchCollectionStatusQueue(
        data.list
          .filter(item => item.collected)
          .map(item => String(item.id).replace('/subject/', ''))
      )
    }, 160)

    return data
  }

  /** 获取排行榜云快照 */
  fetchThirdParty = async () => {
    await tagStore.init('rank')

    setTimeout(async () => {
      if (!this.ota && !this.rank._loaded) {
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
    }, 80)
  }

  /** 上传预数据 */
  updateThirdParty = async () => {
    if (THIRD_PARTY_UPDATED.includes(this.thirdPartyKey)) return

    setTimeout(() => {
      update(this.thirdPartyKey, {
        list: this.rank.list.map(({ collected, ...other }) => other)
      })
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }
}
