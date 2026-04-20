/*
 * @Author: czy0729
 * @Date: 2024-01-04 01:00:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-03 16:40:18
 */
import { rc } from '@utils/dev'
import { TEXT_COPY_COMMENT, TEXT_IGNORE_USER, TEXT_LIKES } from '../../ds'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const POPOVER_DATA = {
  动画: [TEXT_LIKES, TEXT_COPY_COMMENT, '特别关注TA的动画评论', TEXT_IGNORE_USER],
  书籍: [TEXT_LIKES, TEXT_COPY_COMMENT, '特别关注TA的书籍评论', TEXT_IGNORE_USER],
  游戏: [TEXT_LIKES, TEXT_COPY_COMMENT, '特别关注TA的游戏评论', TEXT_IGNORE_USER],
  音乐: [TEXT_LIKES, TEXT_COPY_COMMENT, '特别关注TA的音乐评论', TEXT_IGNORE_USER],
  三次元: [TEXT_LIKES, TEXT_COPY_COMMENT, '特别关注TA的三次元评论', TEXT_IGNORE_USER]
} as const

export const ITEM_HEIGHT = 100
