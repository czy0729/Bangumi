/*
 * @Author: czy0729
 * @Date: 2024-02-03 10:57:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:13:21
 */
import { rakuenStore } from '@stores'
import { confirm, copy, feedback, HTMLDecode, info, open } from '@utils'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import { Ctx } from '../../../types'
import {
  TEXT_BROWSER,
  TEXT_COLLECT,
  TEXT_CONNECT,
  TEXT_COPY_LINK,
  TEXT_COPY_SHARE,
  TEXT_DISCONNECT,
  TEXT_FRIEND,
  TEXT_IGNORE,
  TEXT_PM
} from './ds'

/** 右上角菜单 */
export function handleSelect(key: string, { $, navigation }: Ctx) {
  const url = `${HOST}/user/${$.usersInfo.username}`
  const userId = $.usersInfo.username || $.usersInfo.id || $.userId
  const userName = HTMLDecode($.usersInfo.nickname || $.params._name)

  t('空间.右上角菜单', {
    key,
    userId
  })

  switch (key) {
    case TEXT_BROWSER:
      open(url)
      break

    case TEXT_COPY_LINK:
      copy(url, '已复制链接')
      break

    case TEXT_COPY_SHARE:
      copy(`【链接】${userName} | Bangumi番组计划\n${url}`, '已复制分享文案')
      break

    case TEXT_PM:
      navigation.push('PM', {
        /** 必须是数字 ID */
        userId: $.usersInfo.id,
        userName
      })
      break

    case TEXT_COLLECT:
      $.navigateToUser(navigation)
      break

    case TEXT_FRIEND:
      navigation.push('Friends', {
        userId
      })
      break

    case TEXT_CONNECT:
      $.doConnect()
      break

    case TEXT_DISCONNECT:
      confirm('确定解除好友?', () => $.doDisconnect())
      break

    // case TEXT_BLOCK:
    //   if (userId) {
    //     confirm(
    //       `屏蔽来自 ${userName}@${userId} 的包括条目评论、时间胶囊、超展开相关信息，确定?`,
    //       () => {
    //         rakuenStore.addBlockUser(`${userName}@${userId}`)
    //         info(`已屏蔽 ${userName}`)
    //       }
    //     )
    //   }
    //   break

    case TEXT_IGNORE:
      confirm(
        `与 ${userName} 绝交（不再看到用户的所有话题、评论、日志、私信、提醒）?`,
        async () => {
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
        }
      )
      break

    default:
      break
  }
}
