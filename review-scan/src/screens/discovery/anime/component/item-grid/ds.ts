/*
 * @Author: czy0729
 * @Date: 2024-03-16 19:33:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-16 19:34:16
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemGrid')

export const EVENT = {
  id: 'Anime.跳转'
} as const
