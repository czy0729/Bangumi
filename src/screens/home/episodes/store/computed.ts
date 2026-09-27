/*
 * @Author: czy0729
 * @Date: 2024-08-24 07:09:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-24 07:10:54
 */
import { computed } from 'mobx'
import { subjectStore } from '@stores'
import { HOST } from '@constants'
import { desc } from '@utils'
import State from './state'

export default class Computed extends State {
  @computed get subjectId() {
    return this.params.subjectId
  }

  /** 条目 */
  @computed get subject() {
    return subjectStore.subject(this.subjectId)
  }

  /** 条目章节 (按章节筛选起点截断) */
  @computed get eps() {
    if (this.subject._loaded) {
      const { filterEps = 0 } = this.params
      if (filterEps) return (this.subject.eps || []).filter((_item, index) => index > filterEps)

      return this.subject.eps || []
    }

    return []
  }

  /** 章节列表: sp 排在正常章节后面, 已播放优先 */
  @computed get list() {
    return this.eps.slice().sort((a, b) =>
      desc(a, b, item => (item.status === 'NA' ? 0 : item.type || 10))
    )
  }

  @computed get url() {
    return `${HOST}/subject/${this.subjectId}/ep`
  }

  @computed get hm() {
    return [this.url, 'Episodes'] as const
  }
}
