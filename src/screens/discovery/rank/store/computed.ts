/*
 * @Author: czy0729
 * @Date: 2024-05-24 10:09:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-24 10:12:15
 */
import { computed } from 'mobx'
import { subjectStore, tagStore, userStore } from '@stores'
import { x18 } from '@utils'
import { HTML_RANK, LIST_EMPTY } from '@constants'
import { SubjectId } from '@types'
import { StoreRank } from '../types'
import State from './state'

export default class Computed extends State {
  /** 排行榜云快照 */
  @computed get ota() {
    return this.state.ota[this.thirdPartyKey]
  }

  /** 排行榜 */
  @computed get rank(): StoreRank {
    const { type, filter, airtime, month, currentPage } = this.state
    const rank = tagStore.rank(
      type,
      currentPage[type],
      filter,
      month ? `${airtime}-${month}` : airtime
    )

    if (userStore.isLimit) {
      let _filter = 0
      return {
        ...rank,
        list: rank.list.filter(item => {
          const filter = x18(item.id)
          if (filter) _filter += 1
          return !filter
        }),
        _filter
      }
    }

    return rank
  }

  /** 过滤数据 */
  @computed get list(): StoreRank {
    if (!this.rank._loaded) return this.ota || LIST_EMPTY

    if (this.state.collected) return this.rank

    return {
      ...this.rank,
      list: this.rank.list.filter(item => !item.collected)
    }
  }

  /** 网页端地址 */
  @computed get url() {
    const { currentPage, type, filter, airtime } = this.state
    return HTML_RANK(type, 'rank', currentPage[type], filter, airtime)
  }

  /** 条目信息 */
  subject(subjectId: SubjectId) {
    return computed(() => subjectStore.subject(subjectId)).get()
  }

  /** 云端数据键值 */
  @computed get thirdPartyKey() {
    const { currentPage, type, filter, airtime, month } = this.state
    const query = [type, filter, month ? `${airtime}-${month}` : airtime, currentPage[type]].join(
      '_'
    )
    return `rank_${query}`
  }

  /** 尝试从云端数据查找封面 */
  cover(subjectId: SubjectId) {
    if (!this.ota) return ''

    const find = this.ota.list.find((item: { id: SubjectId }) => item.id === subjectId)
    return find?.cover || ''
  }
}
