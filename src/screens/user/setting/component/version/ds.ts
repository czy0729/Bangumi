/*
 * @Author: czy0729
 * @Date: 2022-07-18 14:58:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-10 20:34:52
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Version')

export const TEXTS = {
  version: {
    hd: '版本',
    ft: '有新版本'
  }
} as const
