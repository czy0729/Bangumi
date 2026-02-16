/*
 * @Author: czy0729
 * @Date: 2024-04-10 14:26:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 05:15:23
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const EVENT = {
  id: '好友.跳转'
} as const
