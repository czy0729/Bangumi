/*
 * @Author: czy0729
 * @Date: 2022-07-18 12:53:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:32:55
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Rakuen')

export const TEXTS = {
  rakuen: {
    hd: '超展开'
  }
} as const
