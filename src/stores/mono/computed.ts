/*
 * @Author: czy0729
 * @Date: 2023-04-24 14:15:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-11 21:31:26
 */
import { computed } from 'mobx'
import hash from '@utils/thirdParty/hash'
import { LIST_EMPTY } from '@constants'
import State from './state'

import type { StoreConstructor, SubjectId } from '@types'
import type { STATE } from './init'
import type { Characters, Persons } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  /** 更多角色 */
  characters(subjectId: SubjectId) {
    const STATE_KEY = 'characters'

    return computed(() => {
      const ITEM_KEY = subjectId
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as Characters
    }).get()
  }

  /** 更多制作人员 */
  persons(subjectId: SubjectId) {
    const STATE_KEY = 'persons'

    return computed(() => {
      const ITEM_KEY = subjectId
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as Persons
    }).get()
  }

  /** 图集数 */
  picTotal(name: string = '') {
    const STATE_KEY = 'picTotal'
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = hash(name).slice(0, 4)
      return this.state[STATE_KEY][ITEM_KEY]
    }).get()
  }
}
