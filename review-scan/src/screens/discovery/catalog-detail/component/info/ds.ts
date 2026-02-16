/*
 * @Author: czy0729
 * @Date: 2024-01-12 05:51:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-12 05:53:20
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Info')

export const LAYOUT_DS = ['列表', '网格'] as const

export const SORT_DS = ['默认', '时间', '评分'] as const
