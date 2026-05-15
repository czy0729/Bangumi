/*
 * @Author: czy0729
 * @Date: 2026-05-05 04:55:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-06 19:02:23
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Input, Text, Touchable } from '@components'
import { UserStatusAvatar } from '@_'
import { _, subjectStore, systemStore, usersStore, userStore } from '@stores'
import { confirm, info, titleCase } from '@utils'
import Block from '../../../block'
import { memoStyles } from './styles'

import type { TrackIds } from '@stores/system/types'

function BlockItem({ navigation, item, setFalse }) {
  const [keyword, setKeyword] = useState('')

  const handleChange = useCallback((text: string) => {
    if (!userStore.isLogin) {
      info('请先登录')
      return false
    }

    setKeyword(text.trim())
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!keyword.length) {
      info('不能为空')
      return
    }

    const result = await usersStore.getUsersThenUpdateInfo(keyword)
    if (result) {
      systemStore.trackUsersCollection(keyword, item.label)
      setKeyword('')
    } else {
      info('没有查询到此用户')
    }
  }, [item.label, keyword])

  const styles = memoStyles()

  const STATE_KEY = `comment${titleCase(item.label)}` as const
  const value = systemStore.setting[STATE_KEY] as TrackIds

  return (
    <View style={styles.container}>
      <Block style={styles.block}>
        <Text type='sub' size={13} bold>
          {item.title}
        </Text>

        <View style={_.mt.xs}>
          {value.length ? (
            value.map(userId => {
              const users = usersStore.usersInfo(userId)
              const trackCount = subjectStore.commentTrack(userId, item.label)
              const textProps = {
                size: trackCount ? 12 : 13,
                bold: true,
                numbersOfLine: 1
              } as const
              const handlePress = () => {
                setFalse()

                setTimeout(() => {
                  navigation.push('Zone', { userId })
                }, 160)
              }

              return (
                <Flex key={userId} style={_.mt.sm}>
                  <UserStatusAvatar
                    key={users.avatar}
                    style={_.mr.sm}
                    navigation={navigation}
                    avatar={users.avatar}
                    userId={users.userId}
                    userName={users.userName}
                    size={30}
                    radius={_.radiusXs}
                    mini
                    onPress={handlePress}
                  />
                  <Flex.Item style={styles.item}>
                    <Text {...textProps} onPress={handlePress}>
                      {users.userName ? `${users.userName} ` : ''}
                      <Text {...textProps} type={users.userName ? 'sub' : 'desc'}>
                        @{userId}
                      </Text>
                    </Text>
                    {!!trackCount && (
                      <Text style={_.mt.xxs} type='sub' size={10} bold>
                        已显示 {trackCount} 次
                      </Text>
                    )}
                  </Flex.Item>
                  <Touchable
                    style={_.ml.md}
                    onPress={() => {
                      confirm('确定取消?', () =>
                        systemStore.cancelTrackUsersCollection(userId, item.label)
                      )
                    }}
                  >
                    <Flex style={styles.icon} justify='center'>
                      <Iconfont name='md-close' size={20} />
                    </Flex>
                  </Touchable>
                </Flex>
              )
            })
          ) : (
            <Text style={styles.item} type='sub' bold>
              (空)
            </Text>
          )}
        </View>

        <Flex style={styles.section}>
          <Flex.Item>
            <Input
              style={styles.input}
              value={keyword}
              placeholder='输入用户 ID'
              returnKeyType='search'
              returnKeyLabel='添加'
              onChangeText={handleChange}
              onSubmitEditing={handleSubmit}
            />
          </Flex.Item>
          <Touchable style={_.ml.md} onPress={handleSubmit}>
            <Flex style={styles.icon} justify='center'>
              <Iconfont name='md-add' size={24} />
            </Flex>
          </Touchable>
        </Flex>
      </Block>
    </View>
  )
}

export default observer(BlockItem)
