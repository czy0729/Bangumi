/*
 * @Author: czy0729
 * @Date: 2023-04-24 14:15:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-11 21:31:26
 */
import { computed } from 'mobx'
import hash from '@utils/thirdParty/hash'
import { LIST_EMPTY } from '@constants'
import { StoreConstructor, SubjectId } from '@types'
import { STATE } from './init'
import State from './state'
import { Characters, Persons } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  /** 更多角色 */
  characters(subjectId: SubjectId) {
    return computed<Characters>(() => {
      return this.state.characters[subjectId] || LIST_EMPTY
    }).get()
  }

  /** 更多制作人员 */
  persons(subjectId: SubjectId) {
    return computed<Persons>(() => {
      return this.state.persons[subjectId] || LIST_EMPTY
    }).get()
  }

  /** 图集数 */
  picTotal(name: string = '') {
    this.init('picTotal', true)
    return computed(() => {
      return this.state.picTotal[hash(name).slice(0, 4)]
    }).get()
  }
}
