/*
 * @Author: czy0729
 * @Date: 2022-07-18 10:35:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:34:22
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Origin')

export const TEXTS = {
  origin: {
    hd: '源头'
  }
} as const
