/*
 * @Author: czy0729
 * @Date: 2023-02-14 03:18:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:50:30
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Blocks')

export const TEXTS = {
  blocks: {
    hd: '屏蔽'
  }
} as const
