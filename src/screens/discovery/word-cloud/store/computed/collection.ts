/*
 * @Author: czy0729
 * @Date: 2026-08-31 06:58:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 07:35:20
 */
import { computed } from 'mobx'
import { FROZEN_ARRAY } from '@constants'
import Comment from './comment'

import type { SubjectId } from '@types'
import type { CollectionsV0Item, SelectedMono } from '../../types'

/** 收藏派生: 用户收藏与条目快照 */
export default class Collection extends Comment {
  /** 参与计算的用户收藏 */
  @computed get collections(): readonly CollectionsV0Item[] {
    try {
      if (this.state.fetchingCollections) return FROZEN_ARRAY

      return this.state.collections[`${this.userId}|${this.state.subjectType}`] || FROZEN_ARRAY
    } catch {}

    return FROZEN_ARRAY
  }

  /** 当前收藏条目集 */
  @computed get subjectIds(): readonly SubjectId[] {
    try {
      return this.collections.map(item => item.id)
    } catch {}

    return FROZEN_ARRAY
  }

  /** 当前收藏条目集 */
  @computed get subjectIdsWithYear(): readonly SubjectId[] {
    try {
      const year = this.state.year.split(' (')?.[0] || ''
      return year
        ? this.collections.filter(item => item.time?.indexOf(year) === 0).map(item => item.id)
        : this.subjectIds
    } catch {}

    return FROZEN_ARRAY
  }

  /** 点击词云后选中的条目 */
  @computed get selectedSubjects(): readonly CollectionsV0Item[] {
    try {
      const { title } = this.state
      if (!title) return FROZEN_ARRAY

      if (this.userId) {
        if (!this.collections.length) return FROZEN_ARRAY

        const { cutType } = this.state
        const year = this.state.year.split(' (')?.[0] || ''
        return this.collections
          .filter(item => {
            if (year && item.time?.indexOf(year) !== 0) return false

            const subject = this.state.subjects[item.id]
            if (!subject?.id) return false

            if (cutType === '标签') {
              return subject.tags?.some(i => title === i.name)
            } else if (cutType === '制作人员') {
              let { subCutType } = this.state
              subCutType = subCutType.split(' (')?.[0] || ''
              return subject.staff?.some(i => {
                if (subCutType) {
                  return subCutType === i.desc && (title === i.name || title === i.nameJP)
                }
                return title === i.name || title === i.nameJP
              })
            } else if (cutType === '声优') {
              return subject.character?.some(i => title === i.desc)
            } else if (cutType === '排名') {
              const { rank } = subject
              if (title === 'N/A') return !rank
              if (title === '前百') return rank && rank <= 100
              if (title.includes('百')) return title === `${Math.floor(rank / 100)}百`
              if (title.includes('千')) return title === `${Math.floor(rank / 1000)}千`
            }

            return false
          })
          .sort((a, b) => b.time.localeCompare(a.time))
      }
    } catch {}

    return FROZEN_ARRAY
  }

  /** 点击词云后选中的角色 */
  @computed get selectedMono(): SelectedMono {
    try {
      const { title, cutType } = this.state
      if (
        !title ||
        (cutType !== '制作人员' && cutType !== '声优') ||
        !this.selectedSubjects.length
      ) {
        return null
      }

      const subjectId = this.selectedSubjects?.[0]?.id
      if (!subjectId) return null

      const subject = this.state.subjects[subjectId]
      if (!subject?.id) return null

      if (cutType === '制作人员') {
        return subject.staff.find(item => title === item.name || title === item.nameJP)
      } else if (cutType === '声优') {
        const item = subject.character.find(item => title === item.desc)
        if (item) {
          return {
            actorId: item.actorId
          }
        }
      }
    } catch {}

    return null
  }

  /** 收藏年份 */
  @computed get years(): readonly string[] {
    try {
      if (this.state.fetchingCollections || !this.subjectIds.length) return FROZEN_ARRAY

      const data: Record<string, number> = {}
      this.collections.forEach(item => {
        const year = item.time.split('-')?.[0]
        if (year && year.length === 4) {
          if (!data[year]) {
            data[year] = 1
          } else {
            data[year] += 1
          }
        }
      })

      return Object.entries(data)
        .sort((a, b) => b[0].localeCompare(a[0]))
        .map(([key, value]) => `${key} (${value})`)
    } catch {}

    return FROZEN_ARRAY
  }

  /** 细分职位, 分词二级类型 */
  @computed get positions(): readonly string[] {
    try {
      if (this.state.fetchingCollections || !this.subjectIdsWithYear.length) return FROZEN_ARRAY

      if (this.state.cutType !== '制作人员') return FROZEN_ARRAY

      const { subjects } = this.state
      const data: Record<string, number> = {}
      const memo: Record<string, 1> = {}
      this.subjectIdsWithYear.forEach(item => {
        const subject = subjects[item]
        if (!subject?.id) return

        if (subject?.staff?.length) {
          subject.staff.forEach(i => {
            const name = i.desc
            if (name) {
              const unique = `${name}|${i.nameJP || i.name}`
              if (!data[name]) {
                data[name] = 1
                memo[unique] = 1
              } else if (!memo[unique]) {
                data[name] += 1
              }
            }
          })
        }
      })

      return Object.entries(data)
        .sort((a, b) => b[1] - a[1])
        .map(([key, value]) => `${key} (${value})`)
    } catch {}

    return FROZEN_ARRAY
  }
}
