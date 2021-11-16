/*
 * @Author: czy0729
 * @Date: 2021-06-11 15:08:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-17 01:38:04
 */
import React from 'react'
import { Clipboard } from 'react-native'
import { getLastPath } from '@screens/_/base/filter-switch'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'
import { matchBgmUrl } from '@utils/match'
import { appNavigate } from '@utils/app'
import BtnMain from './btn-main'

function Btn({ item }, { $, navigation }) {
  rerender('Discovery.Btn')

  const { dragging } = $.state
  const { username, id } = $.userInfo
  const { key, login } = item
  return (
    <BtnMain
      item={item}
      onPress={
        dragging
          ? undefined
          : async () => {
              if (login && !username && !id) return info('请先登陆')

              if (key === 'Open') return $.toggleDragging()

              t('发现.跳转', {
                to: key
              })

              if (key === 'Anime') {
                const key = await getLastPath()
                return navigation.push(key)
              }

              if (key === 'Netabare') {
                return open('https://netaba.re/trending')
              }

              if (key === 'UserTimeline') {
                return navigation.push(key, {
                  userId: username || id
                })
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

              return navigation.push(
                key,
                login
                  ? {
                      userName: username || id
                    }
                  : {}
              )
            }
      }
    />
  )
}

export default obc(Btn)
