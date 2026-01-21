/*
 * @Author: czy0729
 * @Date: 2024-01-18 04:31:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 04:34:09
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemPM')

export const EVENT = {
  id: '电波提醒.跳转'
} as const
