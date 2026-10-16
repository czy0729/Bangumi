/*
 * @Author: czy0729
 * @Date: 2024-11-30 17:33:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-03 20:37:52
 *
 * 关联系列派生: 分组排序 / 过滤与工具栏菜单
 */
import { computed } from 'mobx'
import { userStore } from '@stores'
import { asc, desc } from '@utils'
import { computedFn } from '@utils/computed-fn'
import { TEXT_MENU_FIXED, TEXT_MENU_FLOAT, TEXT_MENU_TOOLBAR, withSplit } from '@constants'
import { SORT_AIRTIME, SORT_RELATIONS, SORT_SCORE, SUBJECT_ITEM } from '../ds'
import State from './state'

import type { SubjectId } from '@types'
import type { CollectionItem, SubjectItem } from '../types'

export default class Computed extends State {
  @computed get userId() {
    return userStore.usersInfo(userStore.myUserId).username || userStore.myUserId
  }

  @computed get subjectIds() {
    return this.state.collections.map(item => item.id)
  }

  collection = computedFn((subjectId: SubjectId): CollectionItem | undefined => {
    return (
      this.state.collections.find(item => item.id === subjectId) ||
      this.state.otherCollections.find(item => item.id === subjectId)
    )
  })

  collections = computedFn((subjectIds: SubjectId[]) => {
    const data: Record<SubjectId, CollectionItem> = {}
    subjectIds.forEach(subjectId => {
      const item = this.collection(subjectId)
      if (item) data[subjectId] = item
    })

    return data
  })

  subject = computedFn((subjectId: SubjectId): SubjectItem => {
    return this.state.subjects[subjectId] || SUBJECT_ITEM
  })

  subjects = computedFn((subjectIds: SubjectId[]) => {
    const data: Record<SubjectId, SubjectItem> = {}
    subjectIds.forEach(subjectId => {
      data[subjectId] = this.subject(subjectId)
    })
    return data
  })

  filterData = computedFn((item: SubjectId[]): SubjectId[] => {
    const { filter } = this.state
    let data = item
    if (filter) {
      data = data.filter(subjectId => {
        const subject = this.subject(subjectId)
        return subject?.platform && String(subject.platform).includes(filter)
      })
    }

    const { airtime } = this.state
    if (airtime) {
      data = data.filter(subjectId => {
        const subject = this.subject(subjectId)
        return subject?.date && String(subject.date).includes(`${airtime}-`)
      })
    }

    const { status } = this.state
    if (status === '未收藏') {
      data = data.filter(subjectId => !this.collection(subjectId))
    } else if (status === '看过') {
      data = data.filter(subjectId => this.collection(subjectId)?.type === 2)
    } else if (status === '在看') {
      data = data.filter(subjectId => this.collection(subjectId)?.type === 3)
    } else if (status === '未看完') {
      data = data.filter(subjectId => {
        const collection = this.collection(subjectId)
        const subject = this.subject(subjectId)
        return collection?.ep && subject?.eps && collection?.ep !== subject?.eps
      })
    }

    return data
  })

  @computed get data() {
    const { data, sort } = this.state
    if (sort === SORT_RELATIONS) return data.slice().sort((a, b) => desc(a.length, b.length))

    if (sort === SORT_AIRTIME) {
      return data.slice().sort((a, b) => {
        const dateA = Math.max(
          ...a.map(item => Number((this.subject(item).date || '0000-00-00').replace(/-/g, '')))
        )
        const dateB = Math.max(
          ...b.map(item => Number((this.subject(item).date || '0000-00-00').replace(/-/g, '')))
        )
        return desc(dateA, dateB)
      })
    }

    if (sort === SORT_SCORE) {
      return data.slice().sort((a, b) => {
        const rankA = Math.min(...a.map(item => this.subject(item).rank || 9999))
        const rankB = Math.min(...b.map(item => this.subject(item).rank || 9999))
        return asc(rankA, rankB)
      })
    }

    return data
  }

  @computed get info() {
    let total = 0
    this.data.forEach(item => (total += item.length))
    return {
      series: this.data.length,
      total
    }
  }

  /** 工具栏菜单 */
  @computed get toolBar() {
    return [`${TEXT_MENU_TOOLBAR}${withSplit(this.state.fixed ? TEXT_MENU_FIXED : TEXT_MENU_FLOAT)}`]
  }
}
