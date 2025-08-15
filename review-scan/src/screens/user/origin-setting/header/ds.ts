/*
 * @Author: czy0729
 * @Date: 2024-01-12 15:26:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 05:28:49
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['origin-setting', 'OriginSetting'] as const

export const DATA = ['说明'] as const
