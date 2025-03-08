/*
 * @Author: czy0729
 * @Date: 2025-03-04 19:19:35
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-03-04 19:19:35
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['tinygrail/transaction', 'TinygrailTransaction'] as const
