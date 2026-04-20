/*
 * @Author: czy0729
 * @Date: 2024-02-08 19:29:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 06:25:03
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['tips', 'Tips'] as const
