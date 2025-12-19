/*
 * @Author: czy0729
 * @Date: 2024-08-27 04:39:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-19 17:42:43
 */
import { computed } from 'mobx'
import { monoStore } from '@stores'
import { asc } from '@utils'
import { HTML_SUBJECT_PERSONS, LIST_EMPTY } from '@constants'
import { LABEL_ALL, SORT_POSITIONS } from '../ds'
import State from './state'

import type { Persons } from '@stores/mono/types'
import type { SnapshotId } from '../types'

export default class Computed extends State {
  @computed get subjectId() {
    return this.params.subjectId
  }

  /** 更多制作人员 */
  @computed get persons() {
    const persons = monoStore.persons(this.subjectId)
    if (!persons._loaded) {
      if (!this.ota) return LIST_EMPTY as Persons

      return {
        ...this.ota,
        pagination: {
          page: 1,
          pageTotal: 10
        }
      }
    }

    return persons
  }

  /** 筛选 */
  @computed get filters(): readonly {
    title: string
    value: number
  }[] {
    const { list } = this.persons
    const map: Record<string, number> = {}
    list.forEach(item => {
      item.positions.forEach(i => {
        if (!map[i]) {
          map[i] = 1
        } else {
          map[i] += 1
        }
      })
    })

    return [
      {
        title: LABEL_ALL,
        value: list.length
      },
      ...Object.entries(map)
        .map(([title, value]) => ({
          title,
          value
        }))
        .sort((a, b) => {
          let indexA = SORT_POSITIONS.findIndex(item => item === a.title)
          if (indexA === -1) indexA = 9999

          let indexB = SORT_POSITIONS.findIndex(item => item === b.title)
          if (indexB === -1) indexB = 9999

          return asc(indexA, indexB)
        })
    ]
  }

  @computed get list() {
    const { position } = this.state
    const { list } = this.persons

    let result = list

    if (position) {
      const value = position.split(' (')?.[0] || ''
      if (value !== LABEL_ALL) {
        result = list.filter(item => item.positions.includes(value))
      }
    }

    // 任何时候：动画制作排最前，其余保持原顺序
    return result.slice().sort((a, b) => {
      const aIsAnime = a.positions.includes('动画制作')
      const bIsAnime = b.positions.includes('动画制作')
      return Number(bIsAnime) - Number(aIsAnime)
    })
  }

  @computed get url() {
    return HTML_SUBJECT_PERSONS(this.subjectId)
  }

  /** 云快照 */
  @computed get ota() {
    return this.state.ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey(): SnapshotId {
    return `persons_${this.subjectId}`
  }

  @computed get hm() {
    return [this.url, 'Persons']
  }
}
