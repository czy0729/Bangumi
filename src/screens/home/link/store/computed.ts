/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:40:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-13 18:01:31
 */
import { computed } from 'mobx'
import State from './state'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class Computed extends State {
  /** 本地化 */
  save = () => {
    return this.saveStorage(this.namespace, EXCLUDE_STATE)
  }

  /** 条目唯一 ID */
  @computed get subjectId() {
    return Number(this.params.subjectId) || 0
  }

  /** 本地化数据键名 */
  @computed get namespace() {
    return `${NAMESPACE}|${this.subjectId}`
  }

  @computed get hm() {
    return [`subject-link/${this.subjectId}`, 'SubjectLink']
  }
}
