/*
 * @Author: czy0729
 * @Date: 2021-06-11 15:08:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-11 18:47:38
 */
import React from 'react'
import { Clipboard } from 'react-native'
import { userStore } from '@stores'
import { appNavigate, info, matchBgmUrl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { DEV } from '@constants'
import i18n from '@constants/i18n'
import { getLastPath } from '@screens/_/base/filter-switch'
import { Fn } from '@types'
import { Ctx } from '../../types'
import Btn from './btn'
import { COMPONENT } from './ds'

export default obc(({ item }, { $, navigation }: Ctx) => {
  const { username, id } = userStore.userInfo
  const userId = username || id

  const { dragging } = $.state
  const { key, login } = item

  let handlePress: Fn
  if (!dragging) {
    handlePress = async () => {
      if (!DEV && login && !userId) {
        info(`请先${i18n.login()}`)
        return
      }

      if (key === 'Open') {
        $.toggleDragging()
        return
      }

      t('发现.跳转', {
        to: key,
        from: 'Btn'
      })

      if (key === 'Anime') {
        navigation.push(await getLastPath())
        return
      }

      if (key === 'Netabare') {
        navigation.push('WebBrowser', {
          url: 'https://netaba.re/trending',
          title: '评分趋势'
        })
        return
      }

      if (key === 'UserTimeline') {
        navigation.push(key, {
          userId
        })
        return
      }

      if (key === 'Link') {
        const content = await Clipboard.getString()
        const urls = matchBgmUrl(content, true) || []
        const url = urls[0]
        if (!url) {
          $.toggleLinkModal()
          return true
        }

        return appNavigate(url, navigation)
      }

      navigation.push(
        key,
        login
          ? {
              userName: userId
            }
          : {}
      )
      return
    }
  }

  return <Btn item={item} userId={username || id} onPress={handlePress} />
}, COMPONENT)
