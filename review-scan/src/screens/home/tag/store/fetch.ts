/*
 * @Author: czy0729
 * @Date: 2024-06-03 07:48:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-18 03:35:51
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
  /** 标签条目 */
  fetchTag = async (refresh?: boolean) => {
    if (refresh) this.fetchThirdParty()

    const { type, tag } = this.params
    const { order, airtime, month, meta } = this.state
    const data = await tagStore.fetchTag(
      {
        text: tag,
        type,
        order,
        airtime: month ? `${airtime}-${month}` : airtime,
        meta
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

  /** 获取云快照 */
  fetchThirdParty = async () => {
    await tagStore.init('tag')

    setTimeout(async () => {
      if (!this.ota && !this.tag._loaded) {
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
        list: this.tag.list.map(({ collected, ...other }) => other)
      })
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchTag(true)
  }

  /** 加载更多 */
  onFooterRefresh = () => {
    // 网页判断不了还有没有下一页, 假如长度小于一页 24 个, 不请求
    if (this.tag.list.length < 24) return false

    return this.fetchTag()
  }
}
