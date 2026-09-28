/*
 * @Author: czy0729
 * @Date: 2024-09-06 00:36:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 派生: 人物作品列表 (云快照兜底 / 收藏过滤) 与工具栏菜单文案
 */
import { computed } from 'mobx'
import { subjectStore } from '@stores'
import { computedFn } from '@utils/computed-fn'
import {
  HTML_MONO_WORKS,
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

import type { MonoWorks } from '@stores/subject/types'
import type { SubjectId } from '@types'
import type { SnapshotId } from '../types'

export default class Computed extends State {
  /** 人物 Id */
  @computed get monoId() {
    return this.params.monoId
  }

  /** 人物作品 */
  @computed get monoWorks() {
    return subjectStore.monoWorks(this.monoId)
  }

  /** 过滤数据 */
  @computed get list(): MonoWorks {
    if (!this.monoWorks._loaded) {
      if (!this.ota) return LIST_EMPTY as MonoWorks

      return {
        ...this.ota,
        pagination: {
          page: 1,
          pageTotal: 10
        }
      }
    }

    if (this.state.collected) return this.monoWorks

    return {
      ...this.monoWorks,
      list: this.monoWorks.list.filter(item => !item.collected)
    }
  }

  /** 网页地址 */
  @computed get url() {
    return HTML_MONO_WORKS(this.monoId, this.state.position, this.state.order)
  }

  /** 条目信息 */
  subject = computedFn((subjectId: SubjectId) => {
    return subjectStore.subject(subjectId)
  })

  /** 云快照 */
  @computed get ota() {
    return this.state.ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey() {
    const query = [this.monoId, this.state.order, this.state.position].join('_')
    return `works_${query}`.replace('/', '_') as SnapshotId
  }

  /** 工具栏菜单 */
  @computed get toolBar() {
    return [
      `${TEXT_MENU_TOOLBAR}${withSplit(this.state.fixed ? TEXT_MENU_FIXED : TEXT_MENU_FLOAT)}`,
      `${TEXT_MENU_LAYOUT}${withSplit(this.state.list ? TEXT_MENU_LIST : TEXT_MENU_GRID)}`,
      `${TEXT_MENU_FAVOR}${withSplit(this.state.collected ? TEXT_MENU_SHOW : TEXT_MENU_NOT_SHOW)}`
    ]
  }

  @computed get hm() {
    return [this.url, 'Works']
  }

  @computed get loading() {
    return !this.list._loaded
  }
}
