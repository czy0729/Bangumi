/*
 * @Author: czy0729
 * @Date: 2024-03-11 16:56:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-14 16:42:27
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const EVENT = {
  id: '番市首富.跳转'
} as const
