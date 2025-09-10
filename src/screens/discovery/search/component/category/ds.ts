/*
 * @Author: czy0729
 * @Date: 2024-01-09 04:17:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-10 10:22:57
 */
import { rc } from '@utils/dev'
import { SEARCH_CAT } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Category')

export const DATA = SEARCH_CAT.map(item => item.label)
