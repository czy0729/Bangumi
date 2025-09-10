/*
 * @Author: czy0729
 * @Date: 2024-01-09 04:17:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-10 10:29:29
 */
import { rc } from '@utils/dev'
import { SEARCH_LEGACY } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Legacy')

export const DATA = SEARCH_LEGACY.map(item => item.label)
