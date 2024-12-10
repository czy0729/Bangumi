/*
 * @Author: czy0729
 * @Date: 2024-05-08 00:59:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 01:34:06
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['group/mine', 'Mine'] as const
