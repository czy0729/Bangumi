/*
 * @Author: czy0729
 * @Date: 2024-09-16 20:17:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-22 12:00:00
 *
 * 派生: 条目信息、wiki 修订历史与页面地址
 */
import { computed } from 'mobx'
import { subjectStore } from '@stores'
import { HTML_SUBJECT } from '@constants'
import State from './state'

export default class Computed extends State {
  @computed get subjectId() {
    return this.params.subjectId
  }

  @computed get subject() {
    return subjectStore.subject(this.subjectId)
  }

  /** wiki 修订历史 */
  @computed get wiki() {
    return subjectStore.wiki(this.subjectId)
  }

  @computed get url() {
    return `${HTML_SUBJECT(this.subjectId)}/edit`
  }

  @computed get hm() {
    return [this.url, 'SubjectWiki'] as const
  }
}
