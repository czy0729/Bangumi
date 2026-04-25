/*
 * @Author: czy0729
 * @Date: 2023-10-30 04:54:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-25 12:51:21
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ActionSheet, Avatar, BgmText, Component, Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { desc, HTMLDecode, navigationReference } from '@utils'
import CacheManager from '@utils/cache-manager'
import { r } from '@utils/dev'
import { Name } from '../name'
import { COMPONENT } from './ds'
import { styles } from './styles'

/** 全局展开该贴贴用户列表 */
export const LikesUsers = observer(({ show, list, emoji, onClose }) => {
  r(COMPONENT)

  const elTitle = useMemo(
    () => (
      <Flex style={_.mb.sm} justify='center'>
        <BgmText style={styles.bgm} size={13} index={emoji} selectable={false} />
        <Text style={_.ml.sm} type='sub' size={13} bold align='center'>
          {list.length}
        </Text>
      </Flex>
    ),
    [emoji, list.length]
  )

  return (
    <Component id='base-likes-users'>
      <ActionSheet
        show={show}
        height={list.length < 10 ? 480 : 640}
        title={elTitle}
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
                  style={styles.user}
                  onPress={() => {
                    onClose()

                    setTimeout(() => {
                      const navigation = navigationReference()
                      if (navigation) {
                        navigation.push('Zone', {
                          userId: item.username,
                          _name: HTMLDecode(item.nickname)
                        })
                      }
                    }, 240)
                  }}
                >
                  <Flex>
                    {!!avatar && (
                      <View style={_.mr.sm}>
                        <Avatar size={28} src={avatar} radius={_.radiusXs} />
                      </View>
                    )}
                    <Name
                      userId={item.username}
                      lineHeight={15}
                      showFriend
                      bold
                      right={
                        <Text type='sub' size={12} lineHeight={15} bold>
                          {' '}
                          @{item.username}
                        </Text>
                      }
                    >
                      {HTMLDecode(item.nickname)}
                    </Name>
                  </Flex>
                </Touchable>
              )
            })}
        </View>
      </ActionSheet>
    </Component>
  )
})

export default LikesUsers
