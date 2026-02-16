/*
 * @Author: czy0729
 * @Date: 2025-03-22 17:21:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-22 21:32:41
 */
import { rc } from '@utils/dev'
import { HOST, HOST_2, HOST_3 } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'From')

export const HOST_DS = [HOST, HOST_2, HOST_3] as const
