/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:28:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-25 15:25:01
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { Avatar } from '@_'
import { _, rakuenStore } from '@stores'
import { BlockedUsersItem } from '@stores/rakuen/types'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { API_AVATAR, FROZEN_FN } from '@constants'
import { UserId } from '@types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

/** 屏蔽列表 */
function History({
  navigation,
  style,
  data,
  showAvatar = false,
  onNavigate,
  onDelete = FROZEN_FN
}: Props) {
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
      {data.map((item: string | BlockedUsersItem) => {
        let userId: UserId = ''
        let text = ''
        if (typeof item === 'object') {
          userId = item.userId
          text = `${item.userName}@${userId}`
        } else {
          text = item
        }

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
        try {
          if (userId) {
            blockCount = rakuenStore.blockedUsersTrack(userId)
          } else if (typeof item === 'string') {
            blockCount = rakuenStore.blockedTrack(item)
            if (!blockCount) {
              const find = Object.keys(rakuenStore.state.blockedTrack).find(key =>
                key.includes(item)
              )
              if (find) blockCount = rakuenStore.blockedTrack(find)
            }
          }
        } catch (error) {}

        return (
          <View key={text} style={styles.item}>
            <Flex style={styles.content}>
              {showAvatar && !!userId && (
                <View style={_.mr.sm}>
                  <Avatar src={API_AVATAR(userId)} size={28} onPress={onPress} />
                </View>
              )}
              <Flex.Item>
                <Text size={blockCount ? 13 : 14} bold onPress={onPress}>
                  {text}
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

export default ob(History, COMPONENT)
