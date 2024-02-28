/*
 * @Author: czy0729
 * @Date: 2024-02-28 11:15:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-28 11:15:58
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const EVENT = {
  id: '用户评分.跳转'
} as const
