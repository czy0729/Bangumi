/*
 * @Author: czy0729
 * @Date: 2026-09-14 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 12:00:00
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Origin')

export const TEXTS = {
  origin: {
    hd: '源头',
    information: '给不同类型的条目，自定义通用跳转',
    search: '源头 跳转'
  }
} as const
