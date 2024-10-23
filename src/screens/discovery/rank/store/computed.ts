/*
 * @Author: czy0729
 * @Date: 2024-05-24 10:09:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-24 10:12:15
 */
import { computed } from 'mobx'
import { tagStore, userStore } from '@stores'
import { x18 } from '@utils'
import { HTML_RANK, LIST_EMPTY } from '@constants'
import { SubjectId } from '@types'
import { ComputedRank, SnapshotId } from '../types'
import State from './state'

export default class Computed extends State {
  /** 排行榜云快照 */
  @computed get ota() {
    return this.state.ota[this.thirdPartyKey]
  }

  /** 年 */
  @computed get airtime() {
    const { airtime } = this.state
    return airtime === '全部' ? '' : airtime
  }

  /** 月 */
  @computed get month() {
    const { month } = this.state
    return month === '全部' ? '' : month
  }

  /** 来源 */
  @computed get source() {
    const { source } = this.state
    return source === '全部' ? '' : source
  }

  /** 来源 */
  @computed get tag() {
    const { tag } = this.state
    return tag === '全部' ? '' : tag
  }

  /** 地区 */
  @computed get area() {
    const { area } = this.state
    return area === '全部' ? '' : area
  }

  /** 受众 */
  @computed get target() {
    const { target } = this.state
    return target === '全部' ? '' : target
  }

  /** 分级 */
  @computed get classification() {
    const { classification } = this.state
    return classification === '全部' ? '' : classification
  }

  /** 题材 */
  @computed get theme() {
    const { theme } = this.state
    return theme === '全部' ? '' : theme
  }

  /** 排行榜 */
  @computed get rank(): ComputedRank {
    const { type, filter, currentPage } = this.state
    const rank = tagStore.rank(
      type,
      currentPage[type],
      filter,
      this.month ? `${this.airtime}-${this.month}` : this.airtime
    )

    if (userStore.isLimit) {
      let _filter = 0
      return {
        ...rank,
        list: rank.list.filter(item => {
          const filter = x18(item.id)
          if (filter) _filter += 1
          return !filter
        }),
        _filter
      }
    }

    return rank
  }

  /** 过滤数据 */
  @computed get list(): ComputedRank {
    if (!this.rank._loaded) return this.ota || LIST_EMPTY

    if (this.state.collected) return this.rank

    return {
      ...this.rank,
      list: this.rank.list.filter(item => !item.collected)
    }
  }

  /** 网页端地址 */
  @computed get url() {
    const { currentPage, type, filter } = this.state
    return HTML_RANK(type, 'rank', currentPage[type], filter, this.airtime)
  }

  /** 云端数据键值 */
  @computed get thirdPartyKey(): SnapshotId {
    const { currentPage, type, filter } = this.state
    const query = [
      type,
      filter,
      this.month ? `${this.airtime}-${this.month}` : this.airtime,
      currentPage[type]
    ].join('_')
    return `rank_${query}`
  }

  /** 尝试从云端数据查找封面 */
  cover(subjectId: SubjectId) {
    if (!this.ota) return ''

    const find = this.ota.list.find((item: { id: SubjectId }) => item.id === subjectId)
    return find?.cover || ''
  }
}
