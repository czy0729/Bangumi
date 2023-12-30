/*
 * @Author: czy0729
 * @Date: 2023-12-30 14:44:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 14:59:31
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Heatmap } from '@components'
import { Popover, IconHeader, IconBack } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { rerender } from '@utils/dev'
import { UserId } from '@types'
import { Ctx } from '../types'
import { DATA_ME, DATA_OTHER } from './ds'
import { styles } from './styles'

function Menu(props, { $, navigation }: Ctx) {
  rerender('User.Menu')

  const { userId: paramsUserId } = $.params
  const { id, username, nickname } = $.usersInfo
  const isMe = !!id && $.myUserId === id
  const data = isMe ? DATA_ME : DATA_OTHER
  return (
    <>
      {!!paramsUserId && (
        <View style={styles.back}>
          <IconBack navigation={navigation} color={_.__colorPlain__} />
        </View>
      )}
      <View style={paramsUserId ? styles.more : isMe ? styles.menu : styles.more}>
        <Popover
          style={styles.touch}
          data={data}
          onSelect={key => {
            t('我的.右上角菜单', {
              key
            })

            switch (key) {
              case '我的空间':
                navigation.push('Zone', {
                  userId: $.userId
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

              case '我的netaba.re':
                open(`https://netaba.re/user/${id}`)
                break

              case 'TA的好友':
                navigation.push('Friends', {
                  userId: id
                })
                break

              case 'TA的netaba.re':
                open(`https://netaba.re/user/${id}`)
                break

              default:
                break
            }
          }}
        >
          <Flex style={styles.icon} justify='center'>
            <Iconfont name='md-menu' color={_.__colorPlain__} />
          </Flex>
          <Heatmap right={-40} id='我的.右上角菜单' />
        </Popover>
      </View>
      <View style={styles.timeline}>
        <IconHeader
          name='md-timeline'
          color={_.__colorPlain__}
          size={21}
          onPress={() => {
            t('我的.跳转', {
              to: 'UserTimeline'
            })

            const data: {
              userId: UserId
              userName?: string
            } = {
              userId: username || id
            }
            if (paramsUserId) data.userName = nickname

            navigation.push('UserTimeline', data)
          }}
        />
        <Heatmap right={48} id='我的.跳转' to='UserTimeline' alias='时间线' />
      </View>
      {!paramsUserId && (
        <View style={styles.setting}>
          <IconHeader
            name='setting'
            color={_.__colorPlain__}
            onPress={() => {
              t('我的.跳转', {
                to: 'Setting'
              })

              navigation.push('Setting')
            }}
          />
          <Heatmap id='我的.跳转' to='Setting' alias='设置' />
        </View>
      )}
    </>
  )
}

export default obc(Menu)
