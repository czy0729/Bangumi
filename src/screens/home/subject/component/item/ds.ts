/*
 * @Author: czy0729
 * @Date: 2024-01-04 01:00:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-23 05:39:39
 */
import { rc } from '@utils/dev'
import { TEXT_COPY_COMMENT, TEXT_IGNORE_USER, TEXT_LIKES } from '../../ds'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

const baseActions = [TEXT_LIKES, TEXT_COPY_COMMENT] as const

const focusAction = (type: string) => `特别关注TA的${type}评论` as const

export const POPOVER_DATA = {
  动画: [...baseActions, focusAction('动画'), TEXT_IGNORE_USER],
  书籍: [...baseActions, focusAction('书籍'), TEXT_IGNORE_USER],
  游戏: [...baseActions, focusAction('游戏'), TEXT_IGNORE_USER],
  音乐: [...baseActions, focusAction('音乐'), TEXT_IGNORE_USER],
  三次元: [...baseActions, focusAction('三次元'), TEXT_IGNORE_USER]
} as const

export const ITEM_HEIGHT = 100
