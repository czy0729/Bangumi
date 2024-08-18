/*
 * @Author: czy0729
 * @Date: 2024-06-03 07:45:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 07:55:40
 */
import { computed } from 'mobx'
import { subjectStore, tagStore } from '@stores'
import { HTML_TAG, LIST_EMPTY, MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectId, SubjectTypeCn } from '@types'
import State from './state'

export default class Computed extends State {
  /** 云快照 */
  @computed get ota() {
    const { ota } = this.state
    return ota[this.thirdPartyKey]
  }

  /** 标签条目 */
  @computed get tag() {
    const { type, tag } = this.params
    const { airtime, month } = this.state
    return tagStore.tag(tag, type, month ? `${airtime}-${month}` : airtime)
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

    const { collected } = this.state
    if (collected) return this.tag

    return {
      ...this.tag,
      list: this.tag.list.filter(item => !item.collected)
    }
  }

  /** 网页端地址 */
  @computed get url() {
    const { type, tag } = this.params
    const { order = 'collects', airtime, month } = this.state
    return HTML_TAG(
      encodeURIComponent(tag),
      type,
      order,
      1,
      month ? `${airtime}-${month}` : airtime
    )
  }

  @computed get thirdPartyKey() {
    const { type, tag } = this.params
    const { airtime, month } = this.state
    const query = [tag, type, month ? `${airtime}-${month}` : airtime].join('_')
    return `tag_${query}`
  }

  /** 条目信息 */
  subject(subjectId: SubjectId) {
    return computed(() => subjectStore.subject(subjectId)).get()
  }
}
