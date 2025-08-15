/*
 * @Author: czy0729
 * @Date: 2024-05-07 18:08:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 18:10:56
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const EVENT = {
  id: '用户日志.跳转'
} as const
