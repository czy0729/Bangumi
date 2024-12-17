/*
 * @Author: czy0729
 * @Date: 2024-03-11 10:52:50
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-03-11 10:52:50
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['tinygrail/rich', 'TinygrailRich'] as const
