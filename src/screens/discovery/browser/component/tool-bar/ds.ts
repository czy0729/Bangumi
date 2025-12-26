/*
 * @Author: czy0729
 * @Date: 2024-01-11 05:18:01
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-11 05:18:01
 */
import { rc } from '@utils/dev'
import { BROWSER_SORT, DATA_BROWSER_MONTH, SUBJECT_TYPE } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ToolBar')

export const DATA_FILTER = SUBJECT_TYPE.map(item => item.title)

export const DATA_MONTH = ['全部', ...DATA_BROWSER_MONTH] as const

export const DATA_SORT = BROWSER_SORT.map(item => item.label)
