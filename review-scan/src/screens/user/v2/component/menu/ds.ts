/*
 * @Author: czy0729
 * @Date: 2023-12-30 14:56:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 20:43:47
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Menu')

export const DATA_ME = [
  '我的空间',
  '我的好友',
  '我的人物',
  '我的目录',
  '我的日志',
  '我的词云',
  '我的时间线',
  '我的netaba.re'
] as const

export const DATA_OTHER = ['TA的好友', 'TA的netaba.re'] as const
