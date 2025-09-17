/*
 * @Author: czy0729
 * @Date: 2025-09-17 17:53:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-17 18:38:42
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemGrid')

export const EVENT = {
  id: '作品.跳转',
  data: {
    type: 'grid'
  }
} as const
