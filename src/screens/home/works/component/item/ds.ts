/*
 * @Author: czy0729
 * @Date: 2025-09-17 17:53:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-17 18:37:46
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const EVENT = {
  id: '作品.跳转',
  data: {
    type: 'list'
  }
} as const
