/*
 * @Author: czy0729
 * @Date: 2024-08-07 22:06:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-08 06:12:58
 */
import { computed } from 'mobx'
import { subjectStore } from '@stores'
import State from './state'

export default class Computed extends State {
  /** 条目唯一 ID */
  @computed get subjectId() {
    return this.params.subjectId
  }

  /** 条目信息 */
  @computed get subject() {
    return subjectStore.subject(this.subjectId)
  }

  /** 条目信息 (来自网页) */
  @computed get subjectFromHTML() {
    return subjectStore.subjectFormHTML(this.subjectId)
  }

  /** 详情 */
  @computed get summary() {
    return this.subject.summary || ''
  }

  /** 网页版详情 */
  @computed get rawInfo() {
    return this.subjectFromHTML.info || ''
  }

  @computed get hm() {
    return [`subject_info/${this.subjectId}`, 'SubjectInfo']
  }
}
