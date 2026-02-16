/*
 * @Author: czy0729
 * @Date: 2022-07-18 12:53:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:46:02
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'User')

export const TEXTS = {
  userGridNum: {
    hd: '网格布局个数'
  }
} as const
