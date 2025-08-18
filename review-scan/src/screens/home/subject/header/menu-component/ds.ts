/*
 * @Author: czy0729
 * @Date: 2024-01-03 00:08:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-12 21:10:09
 */
import { cnjp, copy } from '@utils'
import { URL_ABOUT, WEB } from '@constants'
import { Ctx } from '../../types'

const TEXT_COPY = '复制链接'
const TEXT_SHARE = '复制分享'
const TEXT_POST_SHARE = '拼图分享'
const TEXT_WEB_SHARE = 'APP 网页版分享'
const TEXT_APP = '获取 APP'
const TEXT_SETTING = '设置'

const MENU_DS = [TEXT_COPY, TEXT_SHARE, TEXT_POST_SHARE, TEXT_WEB_SHARE, TEXT_SETTING]
if (WEB) MENU_DS.push(TEXT_APP)
export { MENU_DS }

export const MENU_ACTIONS = {
  [TEXT_COPY]: ($: Ctx['$']) => {
    copy($.url, '已复制链接')
  },
  [TEXT_SHARE]: ($: Ctx['$']) => {
    copy(`【链接】${cnjp($.cn, $.jp)} | Bangumi番组计划\n${$.url}`, '已复制分享文案')
  },
  [TEXT_POST_SHARE]: ($: Ctx['$'], navigation: Ctx['navigation']) => {
    $.onPostShare(navigation)
  },
  [TEXT_WEB_SHARE]: ($: Ctx['$']) => {
    $.onWebShare()
  },
  [TEXT_APP]: () => {
    open(URL_ABOUT)
  },
  [TEXT_SETTING]: (_$: Ctx['$'], navigation: Ctx['navigation']) => {
    navigation.push('Setting', {
      open: 'Subject'
    })
  }
} as const
