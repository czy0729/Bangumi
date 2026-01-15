/*
 * @Author: czy0729
 * @Date: 2024-01-04 01:00:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-15 14:28:05
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_IGNORE } from '@constants'
import { TEXT_COPY_COMMENT, TEXT_LIKES } from '../../ds'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

const baseActions = [TEXT_LIKES, TEXT_COPY_COMMENT] as const

const focusAction = (type: string) => `特别关注TA的${type}评论` as const

export const POPOVER_DATA = {
  动画: [...baseActions, focusAction('动画'), TEXT_MENU_IGNORE],
  书籍: [...baseActions, focusAction('书籍'), TEXT_MENU_IGNORE],
  游戏: [...baseActions, focusAction('游戏'), TEXT_MENU_IGNORE],
  音乐: [...baseActions, focusAction('音乐'), TEXT_MENU_IGNORE],
  三次元: [...baseActions, focusAction('三次元'), TEXT_MENU_IGNORE]
} as const

export const ITEM_HEIGHT = 100
