/*
 * @Author: czy0729
 * @Date: 2024-01-11 15:40:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 16:20:31
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Type')

export const TYPE_DS = ['高级', '最新', '热门'] as const
