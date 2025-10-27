/*
 * @Author: czy0729
 * @Date: 2025-01-14 16:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 16:44:22
 */
import { Loaded } from '@types'
import { Direction } from '../types'

export const STATE = {
  page: 0,
  level: '',
  sort: '',
  direction: '' as Direction,
  _loaded: false as Loaded
}
