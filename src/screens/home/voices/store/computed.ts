/*
 * @Author: czy0729
 * @Date: 2024-09-16 20:49:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 21:43:58
 */
import { computed } from 'mobx'
import { subjectStore } from '@stores'
import { HTML_MONO_VOICES, LIST_EMPTY } from '@constants'
import { sortByOuterOrder, sortSubjects } from './utils'
import State from './state'

import type { MonoVoices } from '@stores/subject/types'
import type { SnapshotId } from '../types'

export default class Computed extends State {
  @computed get monoId() {
    return this.params.monoId
  }

  /** 云快照 */
  @computed get ota() {
    return this.state.ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey() {
    const query = [this.monoId, this.state.position].join('_')
    return `voices_${query}`.replace('/', '_') as SnapshotId
  }

  /** 人物饰演的角色 */
  @computed get monoVoices() {
    const monoVoices = subjectStore.monoVoices(this.monoId)
    if (!monoVoices._loaded) {
      if (!this.ota) return LIST_EMPTY as MonoVoices

      return {
        ...this.ota,
        pagination: {
          page: 1,
          pageTotal: 10
        }
      }
    }

    return monoVoices
  }

  /** 排序后的角色列表 */
  @computed get sortedMonoVoicesList() {
    const { list } = this.monoVoices
    if (!list?.length) return list

    const { outerOrder, innerOrder } = this.state
    let sortedList = [...list]

    // 先按 innerOrder 对每个角色的 subject 数组排序
    if (innerOrder) {
      sortedList = sortedList.map(item => ({
        ...item,
        subject: sortSubjects(item.subject, innerOrder)
      }))
    }

    // 再按 outerOrder 对角色数组排序
    if (outerOrder) {
      sortedList = sortByOuterOrder(sortedList, outerOrder)
    }

    return sortedList
  }

  @computed get url() {
    return HTML_MONO_VOICES(this.monoId, this.state.position)
  }

  @computed get hm() {
    return [this.url, 'Voices'] as const
  }

  @computed get loading() {
    return !this.monoVoices._loaded
  }
}
