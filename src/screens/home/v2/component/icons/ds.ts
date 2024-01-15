/*
 * @Author: czy0729
 * @Date: 2024-01-16 06:04:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-16 06:05:53
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Icons')

export const EVENT = {
  id: '首页.跳转'
} as const
