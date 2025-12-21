/*
 * @Author: czy0729
 * @Date: 2022-06-19 21:26:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-19 21:26:54
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Layout')

export const PREV_TEXT = {
  全部: '条目',
  动画: '番组',
  书籍: '书籍',
  三次元: '电视剧',
  游戏: '游戏'
} as const
