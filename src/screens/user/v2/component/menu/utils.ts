/*
 * @Author: czy0729
 * @Date: 2023-12-31 10:25:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-23 16:12:14
 */
import { open } from '@utils'
import { t } from '@utils/fetch'
import {
  HOST_NETABA,
  TEXT_MENU_BLOGS_SELF,
  TEXT_MENU_CATALOGS_SELF,
  TEXT_MENU_CHARACTER_SELF,
  TEXT_MENU_FRIEND,
  TEXT_MENU_FRIEND_SELF,
  TEXT_MENU_NETABA,
  TEXT_MENU_NETABA_SELF,
  TEXT_MENU_USER_TIMELINE_SELF,
  TEXT_MENU_WORDCLOUD_SELF,
  TEXT_MENU_ZONE_SELF
} from '@constants'
import { Navigation } from '@types'
import { MenuLabel } from './types'

export function handleMenuPopoverPress(
  navigation: Navigation,
  key: MenuLabel,
  { id, userId, username }
) {
  switch (key) {
    case TEXT_MENU_ZONE_SELF:
      navigation.push('Zone', {
        userId
      })
      break

    case TEXT_MENU_FRIEND_SELF:
      navigation.push('Friends')
      break

    case TEXT_MENU_CHARACTER_SELF:
      navigation.push('Character')
      break

    case TEXT_MENU_CATALOGS_SELF:
      navigation.push('Catalogs')
      break

    case TEXT_MENU_BLOGS_SELF:
      navigation.push('Blogs')
      break

    case TEXT_MENU_WORDCLOUD_SELF:
      navigation.push('WordCloud', {
        userId: username || userId
      })
      break

    case TEXT_MENU_USER_TIMELINE_SELF:
      navigation.push('UserTimeline', {
        userId: username || userId
      })
      break

    case TEXT_MENU_NETABA_SELF:
      open(`${HOST_NETABA}/user/${id}`)
      break

    case TEXT_MENU_FRIEND:
      navigation.push('Friends', {
        userId: id
      })
      break

    case TEXT_MENU_NETABA:
      open(`${HOST_NETABA}/user/${id}`)
      break

    default:
      break
  }

  t('我的.右上角菜单', {
    key
  })
}

export function handleUserTimelinePress(
  navigation: Navigation,
  { id, nickname, paramsUserId, username }
) {
  t('我的.跳转', {
    to: 'Milestone'
  })

  const data: any = {
    userId: username || id
  }
  if (paramsUserId) data.userName = nickname

  navigation.push('Milestone', data)
}

export function handleSettingPress(navigation: Navigation) {
  t('我的.跳转', {
    to: 'Setting'
  })

  navigation.push('Setting')
}
