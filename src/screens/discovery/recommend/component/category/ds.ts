/*
 * @Author: czy0729
 * @Date: 2024-03-13 18:29:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 18:30:04
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Category')

export const DATA = [
  '默认',
  '动画',
  '书籍',
  '游戏',
  '音乐',
  '三次元'
  // 'v1'
] as const
