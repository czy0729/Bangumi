/*
 * @Author: czy0729
 * @Date: 2024-02-12 18:01:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-12 18:05:09
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Right')

export const DATA = ['批量献祭', '批量出售', '批量挂卖单', '批量分享'] as const

export const DATA_ICO = ['批量分享'] as const
