/*
 * @Author: czy0729
 * @Date: 2023-10-30 04:54:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 14:55:53
 */
import React from 'react'
import { View } from 'react-native'
import { ActionSheet, Avatar, Bgm, BgmText, Component, Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { desc, navigationReference } from '@utils'
import CacheManager from '@utils/cache-manager'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { Name } from '../name'
import { COMPONENT } from './ds'
import { styles } from './styles'

/** 全局展开该贴贴用户列表 */
export const LikesUsers = ob(
  ({ show, list, emoji, onClose }) => (
    <Component id='base-likes-users'>
      <ActionSheet
        show={show}
        height={list.length < 10 ? 480 : 640}
        title={
          <Flex style={_.mb.sm} justify='center'>
            {emoji > 100 ? (
              <Bgm style={styles.image} index={emoji} size={IOS ? 16 : 14} textOnly={false} />
            ) : (
              <BgmText style={styles.bgm} size={13} index={emoji} selectable={false} />
            )}
            <Text style={_.ml.sm} size={13} bold type='sub' align='center'>
              {list.length}
            </Text>
          </Flex>
        }
        onClose={onClose}
      >
        <View style={_.container.wind}>
          {list
            .slice()
            .sort((a: { username: any }, b: { username: any }) =>
              desc(
                CacheManager.has(`avatar|${a.username}`),
                CacheManager.has(`avatar|${b.username}`)
              )
            )
            .map(item => {
              const avatar = CacheManager.get(`avatar|${item.username}`)
              return (
                <Touchable
                  key={item.username}
                  style={_.mt.md}
                  onPress={() => {
                    onClose()

                    setTimeout(() => {
                      const navigation = navigationReference()
                      if (navigation) {
                        navigation.push('Zone', {
                          userId: item.username,
                          _name: item.nickname
                        })
                      }
                    }, 240)
                  }}
                >
                  <Flex>
                    {!!avatar && (
                      <View style={_.mr.sm}>
                        <Avatar size={32} src={avatar} />
                      </View>
                    )}
                    <Name
                      userId={item.username}
                      showFriend
                      bold
                      right={
                        <Text type='sub' size={12} lineHeight={13} bold>
                          {' '}
                          @{item.username}
                        </Text>
                      }
                    >
                      {item.nickname}
                    </Name>
                  </Flex>
                </Touchable>
              )
            })}
        </View>
      </ActionSheet>
    </Component>
  ),
  COMPONENT
)

export default LikesUsers
