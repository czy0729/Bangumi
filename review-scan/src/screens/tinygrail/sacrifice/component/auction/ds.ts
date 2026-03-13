/*
 * @Author: czy0729
 * @Date: 2024-03-06 02:02:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-06 02:02:57
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Auction')

export const COUNT_DS = ['到500', '到2500', '到12500', '最大'] as const
