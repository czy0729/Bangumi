/*
 * @Author: czy0729
 * @Date: 2021-06-11 15:08:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-22 07:00:43
 */
import React from 'react'
import { Clipboard } from 'react-native'
import { _, userStore, useStore } from '@stores'
import { appNavigate, feedback, info, matchBgmUrl } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { DEV, HOST_NETABA } from '@constants'
import i18n from '@constants/i18n'
import { getLastPath } from '@screens/_/base/filter-switch'
import { Fn } from '@types'
import { Ctx } from '../../types'
import Btn from './btn'
import { COMPONENT } from './ds'

function BtnWrap({ item }) {
  const { $, navigation } = useStore<Ctx>()
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
        feedback(true)
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
          url: `${HOST_NETABA}/trending`,
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
        if (!urls?.[0]) {
          $.toggleLinkModal()
          return true
        }

        appNavigate(content, navigation)
        return
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

  return (
    <Btn
      item={item}
      userId={userId}
      showIcon={!(dragging && _.isSmallDevice)}
      onPress={handlePress}
    />
  )
}

export default ob(BtnWrap, COMPONENT)
