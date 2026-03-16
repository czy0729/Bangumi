/*
 * @Author: czy0729
 * @Date: 2022-07-18 14:58:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 20:30:42
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Version')

export const TEXTS = {
  version: {
    hd: '版本',
    ft: '线上版本'
  }
} as const
