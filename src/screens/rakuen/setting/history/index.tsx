/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:28:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 06:44:55
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Text, Iconfont } from '@components'
import { Avatar } from '@_'
import { _, rakuenStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { API_AVATAR } from '@constants'
import { memoStyles } from './styles'

function History({
  navigation,
  style,
  data = [],
  showAvatar = false,
  onNavigate,
  onDelete = () => {}
}: any) {
  const styles = memoStyles()
  if (!data.length) {
    return (
      <View style={stl(styles.container, style)}>
        <View style={styles.item}>
          <Flex style={styles.content}>
            <Text type='title' size={15} bold>
              空
            </Text>
          </Flex>
        </View>
      </View>
    )
  }

  return (
    <View style={stl(styles.container, style)}>
      {data.map(item => {
        let userId = ''
        try {
          const [, _userId] = item.replace('@undefined', '').split('@')
          if (_userId) userId = _userId
        } catch (error) {}

        const onPress = () => {
          if (!navigation) return

          if (typeof onNavigate === 'function') {
            onNavigate('Zone', {
              userId
            })
            return
          }

          navigation.push('Zone', {
            userId
          })
        }

        let blockCount = 0
        if (userId) blockCount = rakuenStore.blockedUsersTrack(userId)

        return (
          <View key={item} style={styles.item}>
            <Flex style={styles.content}>
              {showAvatar && !!userId && (
                <View style={_.mr.sm}>
                  <Avatar src={API_AVATAR(userId)} size={28} onPress={onPress} />
                </View>
              )}
              <Flex.Item>
                <Text size={blockCount ? 13 : 14} bold onPress={onPress}>
                  {item.replace('@undefined', '')}
                </Text>
                {!!blockCount && (
                  <Text style={_.mt.xxs} size={10} type='sub' bold>
                    已屏蔽 {blockCount} 次
                  </Text>
                )}
              </Flex.Item>
              <Touchable style={[styles.touch, _.ml.md]} onPress={() => onDelete(item)}>
                <Flex style={styles.icon} justify='center'>
                  <Iconfont name='md-close' size={20} />
                </Flex>
              </Touchable>
            </Flex>
          </View>
        )
      })}
    </View>
  )
}

export default ob(History)
