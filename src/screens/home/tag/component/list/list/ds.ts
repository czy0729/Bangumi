/*
 * @Author: czy0729
 * @Date: 2024-08-18 07:58:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 07:59:09
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const EVENT = {
  id: '用户标签.跳转',
  data: {
    type: 'list'
  }
} as const
