/*
 * @Author: czy0729
 * @Date: 2024-02-10 13:54:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 21:16:04
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['sponsor', 'Sponsor'] as const
