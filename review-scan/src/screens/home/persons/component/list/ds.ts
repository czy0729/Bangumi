/*
 * @Author: czy0729
 * @Date: 2024-04-18 16:45:55
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-04-18 16:45:55
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const EVENT = {
  id: '制作人员.跳转'
} as const
