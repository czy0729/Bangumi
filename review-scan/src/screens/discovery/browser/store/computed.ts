/*
 * @Author: czy0729
 * @Date: 2024-05-25 04:31:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-25 04:32:50
 */
import { computed } from 'mobx'
import { subjectStore, tagStore, userStore } from '@stores'
import { x18 } from '@utils'
import {
  HTML_BROSWER,
  LIST_EMPTY,
  TEXT_MENU_FAVOR,
  TEXT_MENU_FIXED,
  TEXT_MENU_FLOAT,
  TEXT_MENU_GRID,
  TEXT_MENU_LAYOUT,
  TEXT_MENU_LIST,
  TEXT_MENU_NOT_SHOW,
  TEXT_MENU_SHOW,
  TEXT_MENU_SPLIT_LEFT,
  TEXT_MENU_SPLIT_RIGHT,
  TEXT_MENU_TOOLBAR
} from '@constants'
import { SubjectId, SubjectType } from '@types'
import State from './state'

export default class Computed extends State {
  /** 日期 */
  @computed get airtime() {
    const { airtime, month } = this.state
    return month && month !== '不选择' ? `${airtime}-${month}` : String(airtime)
  }

  /** 云快照 */
  @computed get ota() {
    return this.state.ota[this.thirdPartyKey]
  }

  /** 索引 */
  @computed get browser() {
    const browser = tagStore.browser(this.state.type, this.airtime, this.state.sort)
    if (userStore.isLimit) {
      let _filter = 0
      const list = browser.list.filter(item => {
        const filter = x18(item.id)
        if (filter) _filter += 1
        return !filter
      })

      return {
        ...browser,
        list,
        _filter
      }
    }

    return browser
  }

  /** 条件索引 */
  @computed get list() {
    if (!this.browser._loaded) {
      return this.ota
        ? {
            ...this.ota,
            pagination: {
              page: 1,
              pageTotal: 10
            }
          }
        : LIST_EMPTY
    }

    if (this.state.collected) return this.browser

    return {
      ...this.browser,
      list: this.browser.list.filter(item => !item.collected)
    }
  }

  /** 索引网址 */
  @computed get url() {
    return HTML_BROSWER(this.state.type as SubjectType, this.airtime, 1, this.state.sort)
  }

  /** 是否列表布局 */
  @computed get isList() {
    return this.state.layout === 'list'
  }

  /** 条目信息 */
  subject(subjectId: SubjectId) {
    return computed(() => subjectStore.subject(subjectId)).get()
  }

  @computed get thirdPartyKey() {
    const query = [this.state.type, this.airtime, this.state.sort].join('_')
    return `browser_${query}`
  }

  /** 工具栏菜单 */
  @computed get toolBar() {
    return [
      `${TEXT_MENU_TOOLBAR}${TEXT_MENU_SPLIT_LEFT}${
        this.state.fixed ? TEXT_MENU_FIXED : TEXT_MENU_FLOAT
      }${TEXT_MENU_SPLIT_RIGHT}`,
      `${TEXT_MENU_LAYOUT}${TEXT_MENU_SPLIT_LEFT}${
        this.state.layout === 'list' ? TEXT_MENU_LIST : TEXT_MENU_GRID
      }${TEXT_MENU_SPLIT_RIGHT}`,
      `${TEXT_MENU_FAVOR}${TEXT_MENU_SPLIT_LEFT}${
        this.state.collected ? TEXT_MENU_SHOW : TEXT_MENU_NOT_SHOW
      }${TEXT_MENU_SPLIT_RIGHT}`
    ]
  }

  @computed get hm() {
    return [this.url, 'Browser'] as const
  }
}
