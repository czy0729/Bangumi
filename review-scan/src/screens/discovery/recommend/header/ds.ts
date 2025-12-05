/*
 * @Author: czy0729
 * @Date: 2024-03-13 18:29:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 18:41:43
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['recommend', 'Recommend'] as const

export const DATA = ['说明', '帖子讨论'] as const
