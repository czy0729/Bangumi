/*
 * @Author: czy0729
 * @Date: 2026-05-06 05:15:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-06 19:02:13
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Input, Text, Touchable } from '@components'
import { UserStatusAvatar } from '@_'
import { _, systemStore, timelineStore, usersStore, userStore } from '@stores'
import { confirm, info } from '@utils'
import Block from '../../../block'
import { memoStyles } from './styles'

function BlockItem({ navigation, setFalse }) {
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
      systemStore.trackCollectionTimelines(keyword)
      timelineStore.fetchCollectionTimelines(keyword, true)
      setKeyword('')
    } else {
      info('没有查询到此用户')
    }
  }, [keyword])

  const styles = memoStyles()

  const value = systemStore.setting.collectionTimelines

  return (
    <View style={styles.container}>
      <Block style={styles.block}>
        <View>
          {value.length ? (
            value.map(userId => {
              const users = usersStore.usersInfo(userId)
              const trackCount = timelineStore.collectionTimelinesTrack(userId)
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
                      confirm('确定取消?', () => systemStore.cancelTrackCollectionTimelines(userId))
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

        <Text style={_.mb.sm} type='icon' size={11} bold>
          {' '}
          PS：此追踪请按需使用，会增加每次冷启动的请求量
        </Text>
      </Block>
    </View>
  )
}

export default observer(BlockItem)
