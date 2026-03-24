/*
 * @Author: czy0729
 * @Date: 2024-10-11 05:45:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-24 06:59:01
 */
import { rc } from '@utils/dev'
import { SUBJECT_TYPE } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Filter')

export const DATA = SUBJECT_TYPE.map(item => item.title)

export const DATA_SCORE = [
  '全部',
  '10',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  '1',
  '未评分',
  '9-10',
  '7-8',
  '4-6',
  '1-3'
] as const
