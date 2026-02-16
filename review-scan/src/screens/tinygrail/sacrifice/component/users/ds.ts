/*
 * @Author: czy0729
 * @Date: 2024-03-06 02:02:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-06 02:09:02
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Users')

export const EVENT = {
  id: '资产重组.跳转',
  data: {
    from: '董事会'
  }
} as const

export const PARAMS = {
  from: 'tinygrail'
} as const
