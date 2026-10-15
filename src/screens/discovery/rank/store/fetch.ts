/*
 * @Author: czy0729
 * @Date: 2024-05-24 10:13:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-29 22:48:39
 *
 * 排行榜请求: 排行榜数据 / 收藏状态队列与云快照读写
 */
import { collectionStore, tagStore } from '@stores'
import { ensureArrayLimit, getTimestamp } from '@utils'
import { get, update } from '@utils/kv'
import { D7 } from '@constants'
import Computed from './computed'
import { COLLECTION_QUEUE_DELAY, THIRD_PARTY_DELAY, THIRD_PARTY_LIMIT } from './ds'

import type { Rank } from '@stores/tag/types'
import type { SnapshotId } from '../types'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED: SnapshotId[] = []

export default class Fetch extends Computed {
  /** 未触发的延迟任务, 卸载时统一清理 */
  private delayTasks: ReturnType<typeof setTimeout>[] = []

  /** 延迟执行, 页面卸载后不再触发 */
  protected delay = (fn: () => void, ms: number) => {
    const handle = setTimeout(() => {
      this.delayTasks = this.delayTasks.filter(item => item !== handle)
      fn()
    }, ms)

    this.delayTasks.push(handle)
  }

  /** 清理延迟任务 */
  clearDelayTasks = () => {
    this.delayTasks.forEach(clearTimeout)
    this.delayTasks = []
  }

  /** 获取排行榜 */
  fetchRank = async () => {
    if (!this.state.pagination) {
      this.fetchRankWithoutPagination(true)
      return
    }

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

    this.fetchCollectionStatusQueue(data)

    return data
  }

  /** 获取排行榜 (不分页) */
  fetchRankWithoutPagination = async (refresh: boolean = false) => {
    const data = await tagStore.fetchRankWithoutPagination(this.query, refresh)

    this.fetchCollectionStatusQueue(data)

    return data
  }

  /** 延迟获取收藏中的条目的具体收藏状态 */
  fetchCollectionStatusQueue = (data: Rank) => {
    this.delay(() => {
      collectionStore.fetchCollectionStatusQueue(
        data.list
          .filter(item => item.collected)
          .map(item => String(item.id).replace('/subject/', ''))
      )
    }, COLLECTION_QUEUE_DELAY)
  }

  /** 获取排行榜云快照 */
  fetchThirdParty = async () => {
    await tagStore.init('rank')

    this.delay(async () => {
      if (!this.ota && !this.rank._loaded) {
        const data = await get<Rank>(this.thirdPartyKey)
        if (!data) {
          // 就算没有数据也插入 key, 用于判断是否需要更新云数据
          this.setState({
            ota: {
              ...this.state.ota,
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
            ...this.state.ota,
            [this.thirdPartyKey]: {
              ...data,
              _loaded: getTimestamp()
            }
          }
        })
      }
    }, THIRD_PARTY_DELAY)
  }

  /** 上传预数据 */
  updateThirdParty = async () => {
    if (THIRD_PARTY_UPDATED.includes(this.thirdPartyKey)) return

    // 快照上传需要在页面退出后也能完成, 不纳入延迟任务清理
    setTimeout(() => {
      update(this.thirdPartyKey, {
        list: this.rank.list.map(({ collected, ...other }) => other)
      })
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
      // 保留最新若干个 key, 旧 key 淘汰后可能重新上传, 但避免数组无界增长
      ensureArrayLimit(THIRD_PARTY_UPDATED, THIRD_PARTY_LIMIT, true)
    }, 0)
  }
}
