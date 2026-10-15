/*
 * @Author: czy0729
 * @Date: 2024-05-24 10:09:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-29 23:32:54
 *
 * 排行榜派生: 筛选参数聚合 / 列表数据过滤与工具栏菜单
 */
import { computed } from 'mobx'
import { tagStore, userStore } from '@stores'
import { x18 } from '@utils'
import {
  HTML_RANK_V2,
  MODEL_SUBJECT_TYPE,
  TEXT_MENU_FAVOR,
  TEXT_MENU_FIXED,
  TEXT_MENU_FLOAT,
  TEXT_MENU_GRID,
  TEXT_MENU_LAYOUT,
  TEXT_MENU_LIST,
  TEXT_MENU_LIST_FOOTER_REFRESH,
  TEXT_MENU_LIST_LOADED,
  TEXT_MENU_LIST_PAGINATION,
  TEXT_MENU_NOT_SHOW,
  TEXT_MENU_PAGINATION,
  TEXT_MENU_SHOW,
  TEXT_MENU_TOOLBAR,
  withSplit
} from '@constants'
import { EMPTY_RANK } from './ds'
import State from './state'

import type { SubjectId, SubjectTypeCn } from '@types'
import type { ComputedRank, OtaSnapshot, SnapshotId } from '../types'

export default class Computed extends State {
  /** 类型 */
  @computed get typeCn() {
    return MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(this.state.type)
  }

  /** 是否列表布局 */
  @computed get isList() {
    return this.state.list
  }

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

  /** 公共标签 */
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
    const { type, filter, sort, currentPage, pagination } = this.state

    const airtime = this.month ? `${this.airtime}-${this.month}` : this.airtime
    const rank = pagination
      ? tagStore.rank(type, filter, sort, airtime, currentPage[type])
      : tagStore.rankWithoutPagination(type, filter, sort, airtime)

    if (userStore.isLimit) {
      let _filter = 0
      return {
        ...rank,
        list: rank.list.filter(item => {
          const filter = x18(item.id, item.nameCn || item.name)
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
    // 云快照与空列表壳作为未加载时的占位数据
    if (!this.rank._loaded) return this.ota || EMPTY_RANK

    if (this.state.collected) return this.rank

    return {
      ...this.rank,
      list: this.rank.list.filter(item => !item.collected)
    }
  }

  /** 请求参数 */
  @computed get query() {
    const { type } = this.state
    return {
      type,
      filter: this.state.filter,
      filterSub: this.state.filterSub,
      source: this.source,
      theme: this.theme,
      tag: this.tag,
      area: this.area,
      target: this.target,
      classification: this.classification,
      airtime: this.month ? `${this.airtime}-${this.month}` : this.airtime,
      order: this.state.sort,
      page: this.state.currentPage[type]
    } as const
  }

  /** 网页端地址 */
  @computed get url() {
    return HTML_RANK_V2(this.query)
  }

  /** hm */
  @computed get hm() {
    return [this.url, 'Rank'] as const
  }

  /** 云端数据键值 */
  @computed get thirdPartyKey(): SnapshotId {
    const { type } = this.state
    return `rank_v2_${[
      type,
      this.state.filter,
      this.state.filterSub,
      this.source,
      this.theme,
      this.tag,
      this.area,
      this.target,
      this.classification,
      this.month ? `${this.airtime}-${this.month}` : this.airtime,
      this.state.sort,
      this.state.currentPage[type]
    ]
      .filter(item => !!item)
      .join('_')}`
  }

  /** 工具栏菜单 */
  @computed get toolBar() {
    const { pagination } = this.state
    const data = [
      `${TEXT_MENU_TOOLBAR}${withSplit(this.state.fixed ? TEXT_MENU_FIXED : TEXT_MENU_FLOAT)}`,
      `${TEXT_MENU_LIST_LOADED}${withSplit(
        pagination ? TEXT_MENU_LIST_PAGINATION : TEXT_MENU_LIST_FOOTER_REFRESH
      )}`,
      `${TEXT_MENU_LAYOUT}${withSplit(this.state.list ? TEXT_MENU_LIST : TEXT_MENU_GRID)}`,
      `${TEXT_MENU_FAVOR}${withSplit(this.state.collected ? TEXT_MENU_SHOW : TEXT_MENU_NOT_SHOW)}`
    ]
    if (pagination) {
      data.push(
        `${TEXT_MENU_PAGINATION}${withSplit(
          this.state.fixedPagination ? TEXT_MENU_FIXED : TEXT_MENU_FLOAT
        )}`
      )
    }
    return data
  }

  /** 云快照封面索引缓存 (只保留当前快照, 避免随快照组合持续增长) */
  private coverCache = {
    key: '' as SnapshotId,
    list: undefined as OtaSnapshot['list'] | undefined,
    map: new Map<SubjectId, string>()
  }

  /** 云快照封面索引, 避免列表逐项线性查找 */
  private coverMap(key: SnapshotId) {
    const list = this.state.ota[key]?.list
    const cache = this.coverCache
    if (cache.key === key && cache.list === list) return cache.map

    const map = new Map<SubjectId, string>()
    list?.forEach(item => {
      if (item.cover) map.set(item.id, item.cover)
    })
    cache.key = key
    cache.list = list
    cache.map = map
    return map
  }

  /** 尝试从云端数据查找封面 */
  cover(subjectId: SubjectId) {
    return this.coverMap(this.thirdPartyKey).get(subjectId) || ''
  }

  /** 是否加载中 */
  @computed get loading() {
    return !this.list._loaded
  }
}
