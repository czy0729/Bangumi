/*
 * @Author: czy0729
 * @Date: 2024-06-02 15:59:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-02 16:33:40
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const EVENT = {
  id: '角色.跳转'
} as const
