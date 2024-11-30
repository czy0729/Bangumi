/*
 * @Author: czy0729
 * @Date: 2024-03-22 06:59:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 05:24:49
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['like', 'Like'] as const
