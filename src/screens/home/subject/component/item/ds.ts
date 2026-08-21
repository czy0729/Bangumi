/*
 * @Author: czy0729
 * @Date: 2024-01-04 01:00:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-05 20:33:03
 */
import { rc } from '@utils/dev'
import {
  TEXT_MENU_IGNORE,
  TEXT_MENU_MANAGE_TRACK,
  TEXT_MENU_SPLIT,
  TEXT_MENU_TRACK_COLLECTIONS_TIMELINE
} from '@constants'
import { TEXT_COPY_COMMENT, TEXT_LIKES } from '../../ds'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

const baseActions = [TEXT_LIKES, TEXT_COPY_COMMENT] as const

const focusAction = (type: string) => `追踪TA的${type}评论` as const

export const POPOVER_DATA = {
  动画: [
    ...baseActions,
    TEXT_MENU_IGNORE,
    TEXT_MENU_SPLIT,
    focusAction('动画'),
    TEXT_MENU_TRACK_COLLECTIONS_TIMELINE,
    TEXT_MENU_MANAGE_TRACK
  ],
  书籍: [
    ...baseActions,
    TEXT_MENU_IGNORE,
    TEXT_MENU_SPLIT,
    focusAction('书籍'),
    TEXT_MENU_MANAGE_TRACK
  ],
  游戏: [
    ...baseActions,
    TEXT_MENU_IGNORE,
    TEXT_MENU_SPLIT,
    focusAction('游戏'),
    TEXT_MENU_MANAGE_TRACK
  ],
  音乐: [
    ...baseActions,
    TEXT_MENU_IGNORE,
    TEXT_MENU_SPLIT,
    focusAction('音乐'),
    TEXT_MENU_MANAGE_TRACK
  ],
  三次元: [
    ...baseActions,
    TEXT_MENU_IGNORE,
    TEXT_MENU_SPLIT,
    focusAction('三次元'),
    TEXT_MENU_MANAGE_TRACK
  ]
} as const
