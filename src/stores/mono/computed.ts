/*
 * @Author: czy0729
 * @Date: 2023-04-24 14:15:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-11 21:31:26
 */
import { computedFn } from '@utils/computed-fn'
import hash from '@utils/thirdParty/hash'
import { LIST_EMPTY } from '@constants'
import State from './state'

import type { StoreConstructor, SubjectId } from '@types'
import type { STATE } from './init'
import type { Characters, Persons } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  // -------------------- 纯计算 (直接 computedFn) --------------------
  /** 更多角色 */
  characters = computedFn((subjectId: SubjectId) => {
    return (this.state.characters[subjectId] || LIST_EMPTY) as Characters
  })

  /** 更多制作人员 */
  persons = computedFn((subjectId: SubjectId) => {
    return (this.state.persons[subjectId] || LIST_EMPTY) as Persons
  })

  // -------------------- 有副作用 (分离 init + computedFn) --------------------
  /** 图集数 */
  private _picTotal = computedFn((name: string = '') => {
    const ITEM_KEY = hash(name).slice(0, 4)
    return this.state.picTotal[ITEM_KEY]
  })

  /** 图集数 */
  picTotal(name: string = '') {
    this.init('picTotal', true)
    return this._picTotal(name)
  }
}
