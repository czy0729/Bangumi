/*
 * @Author: czy0729
 * @Date: 2024-05-08 00:59:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 01:29:10
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Extra')

export const TYPE_DS = ['我的', '全部'] as const
