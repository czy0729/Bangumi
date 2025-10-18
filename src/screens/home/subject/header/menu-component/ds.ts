/*
 * @Author: czy0729
 * @Date: 2024-01-03 00:08:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-17 16:20:44
 */
import { cnjp, copy, open } from '@utils'
import {
  TEXT_MENU_APP,
  TEXT_MENU_COPY_LINK,
  TEXT_MENU_COPY_SHARE,
  TEXT_MENU_POST_SHARE,
  TEXT_MENU_SETTING,
  TEXT_MENU_WEB_SHARE,
  URL_ABOUT,
  WEB
} from '@constants'

import type { Ctx } from '../../types'

const MENU_DS = [
  TEXT_MENU_COPY_LINK,
  TEXT_MENU_COPY_SHARE,
  TEXT_MENU_POST_SHARE,
  TEXT_MENU_WEB_SHARE,
  TEXT_MENU_SETTING
]
if (WEB) MENU_DS.push(TEXT_MENU_APP)
export { MENU_DS }

export const MENU_ACTIONS = {
  [TEXT_MENU_COPY_LINK]: ($: Ctx['$']) => {
    copy($.url, '已复制链接')
  },
  [TEXT_MENU_COPY_SHARE]: ($: Ctx['$']) => {
    copy(`【链接】${cnjp($.cn, $.jp)} | Bangumi番组计划\n${$.url}`, '已复制分享文案')
  },
  [TEXT_MENU_POST_SHARE]: ($: Ctx['$'], navigation: Ctx['navigation']) => {
    $.onPostShare(navigation)
  },
  [TEXT_MENU_WEB_SHARE]: ($: Ctx['$']) => {
    $.onWebShare()
  },
  [TEXT_MENU_APP]: () => {
    open(URL_ABOUT)
  },
  [TEXT_MENU_SETTING]: (_$: Ctx['$'], navigation: Ctx['navigation']) => {
    navigation.push('Setting', {
      open: 'Subject'
    })
  }
} as const
