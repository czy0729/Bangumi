/*
 * @Author: czy0729
 * @Date: 2024-06-03 07:45:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-18 03:35:09
 */
import { computed } from 'mobx'
import { subjectStore, tagStore } from '@stores'
import { HTML_TAG, LIST_EMPTY, MODEL_SUBJECT_TYPE } from '@constants'
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
}
