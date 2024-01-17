/*
 * @Author: czy0729
 * @Date: 2024-01-04 16:49:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 16:57:56
 */
import { rc } from '@utils/dev'
import { TIMELINE_SCOPE } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'TabBarLeft')

export const DATA = TIMELINE_SCOPE.map(item => item.label)
