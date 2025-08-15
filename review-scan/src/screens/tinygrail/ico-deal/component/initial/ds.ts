/*
 * @Author: czy0729
 * @Date: 2024-03-01 22:57:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 09:29:02
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Initial')

export const EVENT = {
  id: 'ICO交易.跳转'
} as const
