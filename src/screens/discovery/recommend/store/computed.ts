/*
 * @Author: czy0729
 * @Date: 2024-06-22 05:12:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-03 20:37:49
 */
import { computed } from 'mobx'
import { subjectStore } from '@stores'
import { computedFn } from '@utils/computed-fn'
import State from './state'

import type { SubjectId } from '@types'

export default class Computed extends State {
  @computed get ids() {
    const ids: SubjectId[] = []
    const { cat } = this.state
    if (cat === 'v1') {
      const { data } = this.state
      ;['top', 'pop', 'tv', 'old_tv', 'movie', 'old_movie', 'nsfw'].forEach(key => {
        data[key].forEach((id: SubjectId) => {
          ids.push(id)
        })
      })
    } else {
      const data = this.state.dataV2[cat] || []
      data.forEach(item => ids.push(item.sid))
    }

    return ids
  }

  subject = computedFn((id: SubjectId) => {
    return subjectStore.subjectV2(id)
  })

  subjectOSS = computedFn((id: SubjectId) => {
    return this.state.subjects[`subject_${id}`] || {}
  })
}
