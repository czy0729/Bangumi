/*
 * @Author: czy0729
 * @Date: 2019-07-15 09:27:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-11 20:38:17
 */
import { SubjectId } from '@types'
import { Characters, Persons } from './types'

export const NAMESPACE = 'Mono'

export const STATE = {
  /** 更多角色 */
  characters: {} as Record<SubjectId, Characters>,

  /** 更多制作人员 */
  persons: {} as Record<SubjectId, Persons>,

  /** 图集数 */
  picTotal: {} as Record<string, number>
}

export const LOADED = {
  picTotal: false
}
