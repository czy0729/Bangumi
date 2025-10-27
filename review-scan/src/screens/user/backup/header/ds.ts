/*
 * @Author: czy0729
 * @Date: 2024-05-06 13:38:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 05:35:52
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['backup', 'Backup'] as const
