/*
 * @Author: czy0729
 * @Date: 2022-08-15 13:07:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:42:30
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Timeline')

export const TEXTS = {
  timelinePopable: {
    hd: '点击条目名字先显示缩略信息'
  }
} as const
