/*
 * @Author: czy0729
 * @Date: 2024-01-06 01:29:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-06 01:35:24
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const EVENT = {
  id: '首页.跳转'
} as const
