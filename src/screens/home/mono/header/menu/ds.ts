/*
 * @Author: czy0729
 * @Date: 2025-08-17 16:32:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-17 23:04:13
 */
import { cnjp, copy } from '@utils'
import { rc } from '@utils/dev'
import { TEXT_MENU_COPY_LINK, TEXT_MENU_COPY_SHARE } from '@constants'
import { COMPONENT as PARENT } from '../ds'

import type { Ctx } from '../../types'

export const COMPONENT = rc(PARENT, 'Menu')

export const MENU_DS = [TEXT_MENU_COPY_LINK, TEXT_MENU_COPY_SHARE] as const

export const MENU_ACTIONS = {
  [TEXT_MENU_COPY_LINK]($: Ctx['$']) {
    copy($.url, '已复制链接')
  },
  [TEXT_MENU_COPY_SHARE]($: Ctx['$']) {
    copy(`【链接】${cnjp($.cn, $.jp)} | Bangumi番组计划\n${$.url}`, '已复制分享文案')
  }
} as const
