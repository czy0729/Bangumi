/*
 * @Author: czy0729
 * @Date: 2024-03-11 08:32:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 08:35:17
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const EVENT = {
  id: 'ICO.跳转'
} as const
