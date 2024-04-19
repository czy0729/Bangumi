/*
 * @Author: czy0729
 * @Date: 2024-04-17 19:49:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-17 19:50:12
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const EVENT = {
  id: '条目目录.跳转'
} as const
