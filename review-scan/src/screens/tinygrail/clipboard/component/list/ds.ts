/*
 * @Author: czy0729
 * @Date: 2025-04-04 07:21:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 07:22:08
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const EVENT = {
  id: '粘贴板.跳转'
} as const
