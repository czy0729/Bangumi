/*
 * @Author: czy0729
 * @Date: 2024-03-10 15:55:50
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-03-10 15:55:50
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['tinygrail/logs', 'TinygrailLogs'] as const
