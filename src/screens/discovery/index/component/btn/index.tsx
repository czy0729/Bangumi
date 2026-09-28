/*
 * @Author: czy0729
 * @Date: 2021-06-11 15:08:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 04:44:59
 */
import { Clipboard } from 'react-native'
import { observer } from 'mobx-react'
import { getLastPath } from '@_'
import { _, userStore, useStore } from '@stores'
import { appNavigate, feedback, info, matchBgmUrl } from '@utils'
import { t } from '@utils/fetch'
import { DEV, HOST_NETABA } from '@constants'
import i18n from '@constants/i18n'
import Btn from './btn'
import { COMPONENT } from './ds'

import type { Paths } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function BtnWrap({ style, item }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { username, id } = userStore.userInfo
  const userId = username || id

  const { dragging } = $.state
  const { key, login } = item

  let handlePress: () => void
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

      // 常规菜单项 key 均为注册路由 (Open / Netabare / UserTimeline / Link 已在上方处理)
      navigation.push(key as Paths)
      return
    }
  }

  return (
    <Btn
      style={style}
      item={item}
      userId={userId}
      showIcon={!(dragging && _.isSmallDevice)}
      onPress={handlePress}
    />
  )
}

export default observer(BtnWrap)
