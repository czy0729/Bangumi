/*
 * @Author: czy0729
 * @Date: 2024-04-07 09:17:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 12:34:23
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['discovery/anitama', 'Anitama'] as const
