/*
 * @Author: czy0729
 * @Date: 2024-05-04 18:58:52
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-05-04 18:58:52
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['vib', 'VIB'] as const

export const TEXT_GROUP = '小组讨论'
