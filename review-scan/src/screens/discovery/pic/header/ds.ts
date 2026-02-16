/*
 * @Author: czy0729
 * @Date: 2025-06-09 15:07:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-09 15:08:40
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['pic', 'Pic'] as const
