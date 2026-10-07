/*
 * @Author: czy0729
 * @Date: 2024-07-20 10:35:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 11:42:24
 *
 * 找 NSFW 派生数据
 */
import { computed } from 'mobx'
import { filterList } from '@_'
import { otaStore, systemStore } from '@stores'
import { ADVANCE_LIMIT } from '../ds'
import State from './state'

export default class Computed extends State {
  /** 是否列表布局 */
  @computed get isList() {
    return this.state.layout === 'list'
  }

  /** 对应项实际显示列表 */
  @computed get list() {
    return filterList({
      list: this.state.data?.list,
      query: this.state.query,
      advance: systemStore.advance,
      advanceLimit: ADVANCE_LIMIT,
      subjectId: index => otaStore.nsfwSubjectId(index)
    })
  }
}
