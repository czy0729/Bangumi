/*
 * @Author: czy0729
 * @Date: 2024-07-20 10:53:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-20 11:15:00
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemGrid')

export const EVENT = {
  id: 'NSFW.跳转'
} as const
