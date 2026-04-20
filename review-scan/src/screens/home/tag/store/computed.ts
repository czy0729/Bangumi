/*
 * @Author: czy0729
 * @Date: 2024-06-03 07:45:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-07 03:39:20
 */
import { computed } from 'mobx'
import { subjectStore, tagStore } from '@stores'
import {
  HTML_TAG,
  LIST_EMPTY,
  MODEL_SUBJECT_TYPE,
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
import { SubjectId, SubjectTypeCn } from '@types'
import { SnapshotId } from '../types'
import State from './state'

export default class Computed extends State {
  /** 云快照 */
  @computed get ota() {
    return this.state.ota[this.thirdPartyKey]
  }

  /** 标签条目 */
  @computed get tag() {
    const { type, tag } = this.params
    const { airtime, month, order, meta } = this.state
    return tagStore.tag(tag, type, month ? `${airtime}-${month}` : airtime, order, meta)
  }

  /** 条目类型中文 */
  @computed get typeCn() {
    return MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(this.params.type) || '动画'
  }

  /** 过滤列表 */
  @computed get list() {
    if (!this.tag._loaded) {
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

    if (this.state.collected) return this.tag

    return {
      ...this.tag,
      list: this.tag.list.filter(item => !item.collected)
    }
  }

  /** 网页端地址 */
  @computed get url() {
    const { type, tag } = this.params
    const { order = 'collects', airtime, month, meta } = this.state
    return HTML_TAG(
      encodeURIComponent(tag),
      type,
      order,
      1,
      month ? `${airtime}-${month}` : airtime,
      meta
    )
  }

  @computed get thirdPartyKey(): SnapshotId {
    const { airtime, month } = this.state
    return `tag_v2_${[
      this.params.type,
      this.params.tag,
      month ? `${airtime}-${month}` : airtime,
      this.state.order,
      this.state.meta ? 'meta' : ''
    ]
      .filter(item => !!item)
      .join('_')}`
  }

  /** 条目信息 */
  subject(subjectId: SubjectId) {
    return computed(() => subjectStore.subject(subjectId)).get()
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
      }${TEXT_MENU_SPLIT_RIGHT}`
    ]
  }

  @computed get hm() {
    return [this.url, 'Tag']
  }
}
