/*
 * @Author: czy0729
 * @Date: 2024-07-14 15:42:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-01 07:17:08
 *
 * 找 Gal 派生数据
 */
import { computed } from 'mobx'
import { collectionStore, otaStore, systemStore } from '@stores'
import { isArray } from '@utils'
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
    if (query.collected === '隐藏') {
      list = list.filter(item => {
        const subjectId = otaStore.advSubjectId(item)
        return !collectionStore.collect(subjectId)
      })
    }

    if (!systemStore.advance) {
      list = list.slice(0, ADVANCE_LIMIT)
    }

    return list
  }
}
