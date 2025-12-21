/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:30:51
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-09-18 14:30:51
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['overview', 'Overview'] as const
