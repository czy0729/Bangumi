/*
 * @Author: czy0729
 * @Date: 2024-01-11 15:40:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 16:14:53
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const EVENT = {
  id: '目录.跳转'
} as const
