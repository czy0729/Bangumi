/*
 * @Author: czy0729
 * @Date: 2024-07-25 20:31:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-01 07:17:16
 */
import { computed } from 'mobx'
import { filterList } from '@_'
import { otaStore, systemStore, userStore } from '@stores'
import { pick } from '@utils/subject/game'
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
      isExtremeLimit: userStore.isExtremeLimit,
      pick,
      subjectId: index => otaStore.gameSubjectId(index)
    })
  }
}
