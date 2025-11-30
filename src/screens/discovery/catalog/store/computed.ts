/*
 * @Author: czy0729
 * @Date: 2024-07-29 13:51:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-30 21:59:27
 */
import { computed } from 'mobx'
import { discoveryStore, userStore } from '@stores'
import { date, getTimestamp, x18s } from '@utils'
import { get } from '@utils/protobuf'
import {
  APP_USERID_IOS_AUTH,
  APP_USERID_TOURIST,
  DATA_CATALOG_TYPE_MAP,
  TEXT_MENU_FIXED,
  TEXT_MENU_FLOAT,
  TEXT_MENU_PAGINATION,
  TEXT_MENU_SPLIT_LEFT,
  TEXT_MENU_SPLIT_RIGHT,
  TEXT_MENU_TOOLBAR,
  WEB
} from '@constants'
import { formatDateToNumber } from './utils'
import State from './state'

import type { ListEmpty } from '@types'
import type { CatalogItem, CatalogType } from '../types'

export default class Computed extends State {
  /** 目录 (整合) */
  @computed get catalogAdvance(): CatalogItem[] {
    if (!this.state.loadedCatalog) return []

    return get('catalog').map(item => {
      const counts = {
        anime: item.a || 0,
        book: item.b || 0,
        music: item.m || 0,
        game: item.g || 0,
        real: item.r || 0,
        character: item.ch || 0,
        person: item.pe || 0,
        topic: item.to || 0,
        blog: item.bl || 0,
        ep: item.ep || 0
      } as const

      // 求最大键
      let maxType: CatalogType = 'anime'
      let maxValue = counts[maxType]

      for (const key in counts) {
        const value = counts[key as keyof typeof counts]
        if (value >= maxValue) {
          maxType = key as CatalogType
          maxValue = value
        }
      }

      return {
        id: item.i,
        title: item.t,
        last: item.l || item.d,
        ...counts,
        _type: maxType
      }
    })
  }

  /** 目录筛选后 (整合) */
  @computed get catalogAdvanceFilter() {
    const { page, filterType, filterYear, filterKey } = this.state
    let list = this.catalogAdvance
    if (filterType && filterType !== '不限') {
      list = list.filter(item => DATA_CATALOG_TYPE_MAP[item._type] === filterType)
    }

    if (filterYear && filterYear !== '不限') {
      if (String(filterYear) === '近1年' || String(filterYear) === '近3年') {
        const ts = getTimestamp()

        // 计算减去的年数
        const expand = String(filterYear) === '近1年' ? 1 : 3

        // 拿到当前年月日，并统一补零
        const year = String(Number(date('Y', ts)) - expand)
        const month = String(date('m', ts)).padStart(2, '0')
        const dayNum = String(date('d', ts)).padStart(2, '0')

        // 构造 YYYYMMDD
        const minDate = Number(`${year}${month}${dayNum}`)
        list = list.filter(item => {
          const lastDateNum = formatDateToNumber(item.last)
          return !isNaN(lastDateNum) && lastDateNum >= minDate
        })
      } else {
        list = list.filter(item => String(item.last).includes(String(filterYear)))
      }
    }

    if (filterKey && filterKey !== '不限') {
      list = list.filter(item => item.title.includes(filterKey))
    }

    const limit = 10
    return {
      list: list.slice(limit * (page - 1), limit * page),
      _loaded: true
    }
  }

  /** 目录 */
  @computed get catalog(): ListEmpty<CatalogItem> {
    if (this.state.type === 'advance') return this.catalogAdvanceFilter

    const catalog = discoveryStore.catalog(this.state.type, this.state.page)
    if (userStore.isLimit) {
      return {
        ...catalog,
        list: catalog.list.filter(item => !x18s(item.title))
      }
    }

    return catalog
  }

  /** 是否限制显示 */
  @computed get isLimit() {
    if (WEB || this.state.type !== 'advance') return false

    if (!userStore.isLogin) return true

    const { id } = userStore.userInfo
    if (!id || id == APP_USERID_TOURIST || id == APP_USERID_IOS_AUTH) return true
  }

  /** 工具栏菜单 */
  @computed get toolBar() {
    return [
      `${TEXT_MENU_TOOLBAR}${TEXT_MENU_SPLIT_LEFT}${
        this.state.fixedFilter ? TEXT_MENU_FIXED : TEXT_MENU_FLOAT
      }${TEXT_MENU_SPLIT_RIGHT}`,
      `${TEXT_MENU_PAGINATION}${TEXT_MENU_SPLIT_LEFT}${
        this.state.fixedPagination ? TEXT_MENU_FIXED : TEXT_MENU_FLOAT
      }${TEXT_MENU_SPLIT_RIGHT}`
    ]
  }
}
