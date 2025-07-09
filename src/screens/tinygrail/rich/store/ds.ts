/*
 * @Author: czy0729
 * @Date: 2021-03-05 14:50:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 17:26:40
 */
import { Loaded } from '@types'
import { COMPONENT } from '../ds'
import { Balance } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  page: 0,
  balance: {
    _loaded: 0
  } as Balance,
  _loaded: false as Loaded
}
