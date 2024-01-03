/*
 * @Author: czy0729
 * @Date: 2024-01-03 15:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 16:40:14
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const POPOVER_DATA = {
  动画: ['贴贴', '复制评论', '特别关注TA的动画评论', '屏蔽用户'],
  书籍: ['贴贴', '复制评论', '特别关注TA的书籍评论', '屏蔽用户'],
  游戏: ['贴贴', '复制评论', '特别关注TA的游戏评论', '屏蔽用户'],
  音乐: ['贴贴', '复制评论', '特别关注TA的音乐评论', '屏蔽用户'],
  三次元: ['贴贴', '复制评论', '特别关注TA的三次元评论', '屏蔽用户']
} as const

export const ITEM_HEIGHT = 100
