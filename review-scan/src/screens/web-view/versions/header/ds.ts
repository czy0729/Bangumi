/*
 * @Author: czy0729
 * @Date: 2024-02-08 15:58:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 06:33:06
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['versions', 'Versions'] as const
