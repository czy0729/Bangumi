/*
 * @Author: czy0729
 * @Date: 2024-01-14 15:32:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 16:55:43
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Mask')

export const LIGHT_THEME = [`rgba(36, 36, 36, 0)`, `rgba(36, 36, 36, 0.5)`, `rgba(36, 36, 36, 1)`]

export const DARK_THEME = [`rgba(0, 0, 0, 0)`, `rgba(0, 0, 0, 0.5)`, `rgba(0, 0, 0, 1)`]
