/*
 * @Author: czy0729
 * @Date: 2024-05-25 04:31:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:20:00
 *
 * 索引派生: 筛选参数 / 列表数据 (x18 与收藏过滤) / 工具栏菜单
 */
import { computed } from 'mobx'
import { _, tagStore, userStore } from '@stores'
import { x18 } from '@utils'
import {
  HTML_BROWSER,
  LIST_EMPTY,
  TEXT_MENU_FAVOR,
  TEXT_MENU_FIXED,
  TEXT_MENU_FLOAT,
  TEXT_MENU_GRID,
  TEXT_MENU_LAYOUT,
  TEXT_MENU_LIST,
  TEXT_MENU_NOT_SHOW,
  TEXT_MENU_SHOW,
  TEXT_MENU_TOOLBAR,
  withSplit
} from '@constants'
import State from './state'

import type { Browser } from '@stores/tag/types'
import type { SubjectType } from '@types'
import type { OtaSnapshot, SnapshotId } from '../types'

export default class Computed extends State {
  /** 年月, 未选择月时只有年 */
  @computed get airtime() {
    const { airtime, month } = this.state
    const monthNum = Number(month)

    return month && !Number.isNaN(monthNum) ? `${airtime}-${month}` : String(airtime)
  }

  /** 云快照 */
  @computed get ota(): OtaSnapshot {
    return this.state.ota[this.thirdPartyKey]
  }

  /** 云快照 key */
  @computed get thirdPartyKey(): SnapshotId {
    return `browser_${[this.state.type, this.airtime, this.state.sort].join('_')}`
  }

  /** 索引 (开启 R18 时过滤敏感条目) */
  @computed get browser(): Browser {
    const browser = tagStore.browser(this.state.type, this.airtime, this.state.sort)
    if (!userStore.isLimit) return browser

    let _filter = 0
    const list = browser.list.filter(item => {
      const filter = x18(item.id, item.nameCn || item.name)
      if (filter) _filter += 1
      return !filter
    })

    return {
      ...browser,
      list,
      _filter
    }
  }

  /** 列表数据, 未加载时回退到云快照 */
  @computed get list(): Browser {
    // 云快照与空列表壳作为未加载时的占位数据
    if (!this.browser._loaded) {
      if (!this.ota) return LIST_EMPTY as Browser

      return {
        ...this.ota,
        pagination: {
          page: 1,
          pageTotal: 10
        }
      }
    }

    if (this.state.collected) return this.browser

    return {
      ...this.browser,
      list: this.browser.list.filter(item => !item.collected)
    }
  }

  /** 索引网址 */
  @computed get url() {
    return HTML_BROWSER(this.state.type as SubjectType, this.airtime, 1, this.state.sort)
  }

  /** 是否列表布局 */
  @computed get isList() {
    return this.state.layout === 'list'
  }

  /** 网格布局列数 */
  @computed get numColumns() {
    return _.portrait(_.device(3, 4), 5)
  }

  /** 工具栏菜单 */
  @computed get toolBar() {
    return [
      `${TEXT_MENU_TOOLBAR}${withSplit(this.state.fixed ? TEXT_MENU_FIXED : TEXT_MENU_FLOAT)}`,
      `${TEXT_MENU_LAYOUT}${withSplit(this.isList ? TEXT_MENU_LIST : TEXT_MENU_GRID)}`,
      `${TEXT_MENU_FAVOR}${withSplit(this.state.collected ? TEXT_MENU_SHOW : TEXT_MENU_NOT_SHOW)}`
    ]
  }

  /** 路由 heatmap */
  @computed get hm() {
    return [this.url, 'Browser'] as const
  }
}
