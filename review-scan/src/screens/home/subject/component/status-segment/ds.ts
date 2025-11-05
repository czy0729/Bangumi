/*
 * @Author: czy0729
 * @Date: 2024-04-29 22:33:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-30 00:17:59
 */
import { rc } from '@utils/dev'
import { RATING_STATUS } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'StatusSegement')

export const STATUS_DS = ['全部', ...RATING_STATUS.map(item => item.label)] as const
