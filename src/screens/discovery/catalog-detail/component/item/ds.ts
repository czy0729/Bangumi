/*
 * @Author: czy0729
 * @Date: 2024-01-12 05:51:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-12 05:57:01
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const EVENT = {
  id: '目录详情.跳转'
} as const
