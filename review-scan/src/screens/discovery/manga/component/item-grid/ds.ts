/*
 * @Author: czy0729
 * @Date: 2024-07-26 05:16:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-23 05:37:19
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemGrid')

export const EVENT = {
  id: 'Manga.跳转'
} as const
