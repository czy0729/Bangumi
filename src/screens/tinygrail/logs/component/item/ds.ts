/*
 * @Author: czy0729
 * @Date: 2024-03-10 15:59:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-21 17:22:07
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const ITEMS = ['买入', '卖出', '混沌魔方'] as const
