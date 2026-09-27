/*
 * @Author: czy0729
 * @Date: 2024-08-24 11:21:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-27 08:46:30
 */
import { computed } from 'mobx'
import { monoStore } from '@stores'
import { HTML_SUBJECT_CHARACTERS, LIST_EMPTY } from '@constants'
import { LABEL_ALL } from '../ds'
import State from './state'

import type { Characters, CharactersItem } from '@stores/mono/types'
import type { SnapshotId } from '../types'

export default class Computed extends State {
  @computed get subjectId() {
    return this.params.subjectId
  }

  /** 更多角色 */
  @computed get characters() {
    const characters = monoStore.characters(this.subjectId)
    if (!characters._loaded) {
      if (!this.ota) return LIST_EMPTY as Characters

      return {
        ...this.ota,
        pagination: {
          page: 1,
          pageTotal: 10
        }
      }
    }

    return characters
  }

  /** 筛选 */
  @computed get filters(): readonly {
    title: string
    value: number
  }[] {
    const { list } = this.characters

    // 各定位计数, 按列表中首次出现的先后排序
    const map: Record<string, number> = {}
    list.forEach(item => {
      if (!item.position) return

      if (!map[item.position]) {
        map[item.position] = 1
      } else {
        map[item.position] += 1
      }
    })

    return [
      {
        title: LABEL_ALL,
        value: list.length
      },
      ...Object.entries(map).map(([title, value]) => ({
        title,
        value
      }))
    ]
  }

  /** 筛选后的列表 */
  @computed get list(): CharactersItem[] {
    const { position } = this.state
    const { list } = this.characters

    if (!position || position === LABEL_ALL) return list

    // 数据刷新后原定位可能已不存在, 回退显示全部, 与工具条回退到首项的文案保持一致
    if (!list.some(item => item.position === position)) return list

    return list.filter(item => item.position === position)
  }

  @computed get url() {
    return HTML_SUBJECT_CHARACTERS(this.subjectId)
  }

  /** 云快照 */
  @computed get ota() {
    return this.state.ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey() {
    return `characters_${this.subjectId}` as SnapshotId
  }

  @computed get hm() {
    return [this.url, 'Characters']
  }
}
