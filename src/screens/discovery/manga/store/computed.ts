/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 00:00:00
 *
 * 找漫画派生数据
 */
import { computed } from 'mobx'
import { collectionStore, otaStore, systemStore, userStore } from '@stores'
import { isArray } from '@utils'
import { pick } from '@utils/subject/manga'
import { ADVANCE_LIMIT } from '../ds'
import State from './state'

export default class Computed extends State {
  /** 是否列表布局 */
  @computed get isList() {
    return this.state.layout === 'list'
  }

  /** 对应项实际显示列表 */
  @computed get list() {
    const { data, query } = this.state
    let list = isArray(data?.list) ? data.list : []

    /** 受限用户隐藏 NSFW 条目 (finger 的 x) */
    if (userStore.isExtremeLimit) {
      list = list.filter(item => pick(item).x !== 1)
    }

    if (query.collected === '隐藏') {
      list = list.filter(item => {
        const subjectId = otaStore.mangaSubjectId(item)
        return !collectionStore.collect(subjectId)
      })
    }

    if (!systemStore.advance) {
      list = list.slice(0, ADVANCE_LIMIT)
    }

    return list
  }
}
