/*
 * @Author: czy0729
 * @Date: 2024-05-08 02:51:40
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-05-08 02:51:40
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['rakuen/history', 'RakuenHistory'] as const

export const DATA = ['说明'] as const
