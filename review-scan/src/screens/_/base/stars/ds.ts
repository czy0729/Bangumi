/*
 * @Author: czy0729
 * @Date: 2024-01-14 03:26:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:53:46
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Stars')

export const NUMS = [1, 2, 3, 4, 5] as const
