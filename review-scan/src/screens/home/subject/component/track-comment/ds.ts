/*
 * @Author: czy0729
 * @Date: 2024-01-02 21:45:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-02 21:46:20
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'TrackComment')

export const POPOVER_DATA = {
  动画: ['取消动画特别关注'],
  书籍: ['取消书籍特别关注'],
  游戏: ['取消游戏特别关注'],
  音乐: ['取消音乐特别关注'],
  三次元: ['取消三次元评别关注']
} as const
