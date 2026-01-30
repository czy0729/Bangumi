/*
 * @Author: czy0729
 * @Date: 2024-02-02 23:53:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-30 05:34:04
 */
import { rakuenStore } from '@stores'
import { confirm, copy, feedback, HTMLDecode, info, open } from '@utils'
import { t } from '@utils/fetch'
import {
  HOST,
  TEXT_MENU_BROWSER,
  TEXT_MENU_CHARACTER,
  TEXT_MENU_COLLECT,
  TEXT_MENU_CONNECT,
  TEXT_MENU_COPY_LINK,
  TEXT_MENU_COPY_SHARE,
  TEXT_MENU_DISCONNECT,
  TEXT_MENU_FRIEND,
  TEXT_MENU_IGNORE,
  TEXT_MENU_PM,
  TEXT_MENU_REPORT,
  WEB
} from '@constants'

import type { Ctx } from '../../../types'

export const MENU_DS = [
  TEXT_MENU_BROWSER,
  TEXT_MENU_COPY_LINK,
  TEXT_MENU_COPY_SHARE,
  !WEB && TEXT_MENU_PM,
  TEXT_MENU_COLLECT,
  TEXT_MENU_FRIEND,
  TEXT_MENU_CHARACTER
].filter(Boolean)

export const MENU_ACTIONS = {
  [TEXT_MENU_BROWSER](context: Ctx) {
    const { url } = getData(context)
    open(url)
  },
  [TEXT_MENU_COPY_LINK](context: Ctx) {
    const { url } = getData(context)
    copy(url, '已复制链接')
  },
  [TEXT_MENU_COPY_SHARE](context: Ctx) {
    const { url, userName } = getData(context)
    copy(`【链接】${userName} | Bangumi番组计划\n${url}`, '已复制分享文案')
  },
  [TEXT_MENU_PM](context: Ctx) {
    const { $, navigation } = context
    const { userName } = getData(context)
    navigation.push('PM', {
      userId: $.usersInfo.id,
      userName
    })
  },
  [TEXT_MENU_COLLECT](context: Ctx) {
    const { $, navigation } = context
    $.navigateToUser(navigation)
  },
  [TEXT_MENU_FRIEND](context: Ctx) {
    const { navigation } = context
    const { userId } = getData(context)
    navigation.push('Friends', {
      userId
    })
  },
  [TEXT_MENU_CHARACTER](context: Ctx) {
    const { navigation } = context
    const { userId } = getData(context)
    navigation.push('Character', {
      userName: userId
    })
  },
  [TEXT_MENU_CONNECT](context: Ctx) {
    const { $ } = context
    $.doConnect()
  },
  [TEXT_MENU_DISCONNECT](context: Ctx) {
    const { $ } = context
    confirm('确定解除好友?', () => $.doDisconnect())
  },
  [TEXT_MENU_IGNORE](context: Ctx) {
    const { userId, userName } = getData(context)
    confirm(`与 ${userName} 绝交（不再看到用户的所有话题、评论、日志、私信、提醒）?`, async () => {
      if (!rakuenStore.formhash) await rakuenStore.fetchPrivacy()

      rakuenStore.doBlockUser(
        {
          keyword: String(userId)
        },
        async () => {
          t('空间.绝交')

          info('已添加绝交')
          feedback()
          rakuenStore.fetchPrivacy()
        },
        () => {
          info('添加失败, 可能授权信息过期')
        }
      )
    })
  },
  [TEXT_MENU_REPORT](context: Ctx) {
    const { id } = getData(context)
    open(`${HOST}/report?type=6&id=${id}`)
  }
} as const

function getData({ $ }: Ctx) {
  return {
    url: `${HOST}/user/${$.usersInfo.username}`,
    id: $.usersInfo.id || $.userId,
    userId: $.usersInfo.username || $.usersInfo.id || $.userId,
    userName: HTMLDecode($.usersInfo.nickname || $.params._name)
  }
}
