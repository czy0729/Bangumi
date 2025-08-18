/*
 * @Author: czy0729
 * @Date: 2024-05-07 22:05:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 22:08:05
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Chat')

export const EVENT = {
  id: '短信.跳转'
} as const
