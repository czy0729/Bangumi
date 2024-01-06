/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:52:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-28 09:55:02
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { _, rakuenStore } from '@stores'
import { confirm, copy, HTMLDecode, info, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, STORYBOOK } from '@constants'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Menu(props, { $, navigation }: Ctx) {
  const { _name } = $.params
  const { nickname, id, username } = $.usersInfo

  const data = ['浏览器查看', '复制链接', '复制分享']
  if (!STORYBOOK) data.push('发短信')
  data.push('TA的收藏', 'TA的好友')

  if (!STORYBOOK) {
    if ($.users.connectUrl) {
      data.push('加为好友')
    } else if ($.users.disconnectUrl) {
      data.push('解除好友')
    }
    data.push('屏蔽用户')
  }

  return (
    <View style={styles.touch}>
      <Popover
        key={id || username}
        data={data}
        onSelect={key => {
          t('空间.右上角菜单', {
            key,
            userId: $.userId
          })

          const url = `${HOST}/user/${username}`
          const userName = HTMLDecode(nickname || _name)
          switch (key) {
            case '浏览器查看':
              open(url)
              break

            case '复制链接':
              copy(url, '已复制链接')
              break

            case '复制分享':
              copy(`【链接】${userName} | Bangumi番组计划\n${url}`, '已复制分享文案')
              break

            case '发短信':
              navigation.push('PM', {
                userId: id,
                userName
              })
              break

            case 'TA的收藏':
              $.navigateToUser(navigation)
              break

            case 'TA的好友':
              navigation.push('Friends', {
                userId: username || id
              })
              break

            case '加为好友':
              $.doConnect()
              break

            case '解除好友':
              confirm('确定解除好友?', () => $.doDisconnect())
              break

            case '屏蔽用户':
              if (username || id) {
                confirm(
                  `屏蔽来自 ${userName}@${
                    username || id
                  } 的包括条目评论、时间胶囊、超展开相关信息，确定?`,
                  () => {
                    rakuenStore.addBlockUser(`${userName}@${username || id}`)
                    info(`已屏蔽 ${userName}`)
                  }
                )
              }
              break

            default:
              break
          }
        }}
      >
        <Flex style={styles.icon} justify='center'>
          <Iconfont name='md-more-vert' color={_.__colorPlain__} />
        </Flex>
        <Heatmap id='空间.右上角菜单' />
        <Heatmap right={62} id='空间.添加好友' transparent />
        <Heatmap right={113} id='空间.解除好友' transparent />
        <Heatmap right={170} id='空间.跳转' to='WebBrowser' alias='浏览器' transparent />
      </Popover>
    </View>
  )
}

export default obc(Menu)
