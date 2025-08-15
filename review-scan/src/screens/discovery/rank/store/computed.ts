/*
 * @Author: czy0729
 * @Date: 2024-05-24 10:09:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-23 15:23:38
 */
import { computed } from 'mobx'
import { tagStore, userStore } from '@stores'
import { x18 } from '@utils'
import {
  HTML_RANK_V2,
  LIST_EMPTY,
  MODEL_SUBJECT_TYPE,
  TEXT_MENU_FAVOR,
  TEXT_MENU_FIXED,
  TEXT_MENU_FLOAT,
  TEXT_MENU_GRID,
  TEXT_MENU_LAYOUT,
  TEXT_MENU_LIST,
  TEXT_MENU_NOT_SHOW,
  TEXT_MENU_PAGINATION,
  TEXT_MENU_SHOW,
  TEXT_MENU_SPLIT_LEFT,
  TEXT_MENU_SPLIT_RIGHT,
  TEXT_MENU_TOOLBAR
} from '@constants'
import { SubjectId, SubjectTypeCn } from '@types'
import { ComputedRank, SnapshotId } from '../types'
import State from './state'

export default class Computed extends State {
  /** 类型 */
  @computed get typeCn() {
    return MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(this.state.type)
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
    const { type, filter, sort, currentPage } = this.state
    const rank = tagStore.rank(
      type,
      filter,
      sort,
      this.month ? `${this.airtime}-${this.month}` : this.airtime,
      currentPage[type]
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
    return [
      `${TEXT_MENU_TOOLBAR}${TEXT_MENU_SPLIT_LEFT}${
        this.state.fixed ? TEXT_MENU_FIXED : TEXT_MENU_FLOAT
      }${TEXT_MENU_SPLIT_RIGHT}`,
      `${TEXT_MENU_LAYOUT}${TEXT_MENU_SPLIT_LEFT}${
        this.state.list ? TEXT_MENU_LIST : TEXT_MENU_GRID
      }${TEXT_MENU_SPLIT_RIGHT}`,
      `${TEXT_MENU_FAVOR}${TEXT_MENU_SPLIT_LEFT}${
        this.state.collected ? TEXT_MENU_SHOW : TEXT_MENU_NOT_SHOW
      }${TEXT_MENU_SPLIT_RIGHT}`,
      `${TEXT_MENU_PAGINATION}${TEXT_MENU_SPLIT_LEFT}${
        this.state.fixedPagination ? TEXT_MENU_FIXED : TEXT_MENU_FLOAT
      }${TEXT_MENU_SPLIT_RIGHT}`
    ]
  }

  /** 尝试从云端数据查找封面 */
  cover(subjectId: SubjectId) {
    if (!this.ota) return ''

    const find = this.ota.list.find((item: { id: SubjectId }) => item.id === subjectId)
    return find?.cover || ''
  }
}
