/*
 * @Author: czy0729
 * @Date: 2024-01-06 01:29:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-06 01:32:43
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Empty')

export const FOOTER_EMPTY_TEXT = {
  全部: '当前没有可管理的条目哦',
  动画: '当前没有在追的番组哦',
  书籍: '当前没有在读的书籍哦',
  三次元: '当前没有在追的电视剧哦',
  游戏: '当前没有在玩的游戏哦'
} as const
