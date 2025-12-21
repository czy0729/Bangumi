/*
 * @Author: czy0729
 * @Date: 2023-12-31 10:25:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 20:44:09
 */
import { open } from '@utils'
import { t } from '@utils/fetch'
import { HOST_NETABA } from '@constants'
import { Navigation } from '@types'
import { DATA_ME, DATA_OTHER } from './ds'

export function handleMenuPopoverPress(
  navigation: Navigation,
  key: (typeof DATA_ME)[number] | (typeof DATA_OTHER)[number],
  { id, userId, username }
) {
  t('我的.右上角菜单', {
    key
  })

  switch (key) {
    case '我的空间':
      navigation.push('Zone', {
        userId
      })
      break

    case '我的好友':
      navigation.push('Friends')
      break

    case '我的人物':
      navigation.push('Character')
      break

    case '我的目录':
      navigation.push('Catalogs')
      break

    case '我的日志':
      navigation.push('Blogs')
      break

    case '我的词云':
      navigation.push('WordCloud', {
        userId: username || userId
      })
      break

    case '我的时间线':
      navigation.push('UserTimeline', {
        userId: username || userId
      })
      break

    case '我的netaba.re':
      open(`${HOST_NETABA}/user/${id}`)
      break

    case 'TA的好友':
      navigation.push('Friends', {
        userId: id
      })
      break

    case 'TA的netaba.re':
      open(`${HOST_NETABA}/user/${id}`)
      break

    default:
      break
  }
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
