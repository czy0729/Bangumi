/*
 * @Author: czy0729
 * @Date: 2024-07-14 15:05:10
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-07-14 15:05:10
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemGrid')

export const EVENT = {
  id: 'ADV.跳转'
} as const
