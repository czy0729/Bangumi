/*
 * @Author: czy0729
 * @Date: 2024-04-05 04:45:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-05 04:48:18
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'RecSegement')

export const DS = ['数量', '排名'] as const
