/*
 * @Author: czy0729
 * @Date: 2024-11-30 17:33:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 22:55:22
 */
import { computed } from 'mobx'
import { userStore } from '@stores'
import { asc, desc } from '@utils'
import {
  TEXT_MENU_FIXED,
  TEXT_MENU_FLOAT,
  TEXT_MENU_SPLIT_LEFT,
  TEXT_MENU_SPLIT_RIGHT,
  TEXT_MENU_TOOLBAR
} from '@constants'
import { SubjectId } from '@types'
import { SUBJECT_ITEM } from '../ds'
import State from './state'

export default class Computed extends State {
  @computed get userId() {
    return userStore.usersInfo(userStore.myUserId).username || userStore.myUserId
  }

  @computed get subjectIds() {
    return this.state.collections.map(item => item.id)
  }

  collection(subjectId: SubjectId) {
    return computed(() => {
      return (
        this.state.collections.find(item => item.id === subjectId) ||
        this.state.otherCollections.find(item => item.id === subjectId)
      )
    }).get()
  }

  collections(subjectIds: SubjectId[]) {
    return computed(() => {
      const data = {}
      subjectIds.forEach(subjectId => {
        const item = this.collection(subjectId)
        if (item) data[subjectId] = item
      })

      return data
    }).get()
  }

  subject(subjectId: SubjectId) {
    return computed(() => {
      return this.state.subjects[subjectId] || SUBJECT_ITEM
    }).get()
  }

  subjects(subjectIds: SubjectId[]) {
    return computed(() => {
      const data = {}
      subjectIds.forEach(subjectId => {
        data[subjectId] = this.subject(subjectId)
      })
      return data
    }).get()
  }

  filterData(item: SubjectId[]) {
    return computed(() => {
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
    }).get()
  }

  @computed get data() {
    const { data, sort } = this.state
    if (sort === '关联数') return data.slice().sort((a, b) => desc(a.length, b.length))

    if (sort === '新放送') {
      return data.slice().sort((a, b) => {
        const dateA = Math.max(
          ...a.map((item: SubjectId) =>
            Number((this.subject(item).date || '0000-00-00').replace(/-/g, ''))
          )
        )
        const dateB = Math.max(
          ...b.map((item: SubjectId) =>
            Number((this.subject(item).date || '0000-00-00').replace(/-/g, ''))
          )
        )
        return desc(dateA, dateB)
      })
    }

    if (sort === '评分') {
      return data.slice().sort((a, b) => {
        const rankA = Math.min(...a.map((item: SubjectId) => this.subject(item).rank || 9999))
        const rankB = Math.min(...b.map((item: SubjectId) => this.subject(item).rank || 9999))
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
    return [
      `${TEXT_MENU_TOOLBAR}${TEXT_MENU_SPLIT_LEFT}${
        this.state.fixed ? TEXT_MENU_FIXED : TEXT_MENU_FLOAT
      }${TEXT_MENU_SPLIT_RIGHT}`
    ]
  }
}
