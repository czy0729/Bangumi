/*
 * @Author: czy0729
 * @Date: 2023-10-30 04:54:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-30 05:13:43
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { ActionSheet, Avatar, Touchable, Flex, Text, BgmText, Bgm } from '@components'
import { _ } from '@stores'
import { desc, navigationReference } from '@utils'
import CacheManager from '@utils/cache-manager'
import { IOS } from '@constants'
import { styles } from './styles'

export const LikesUsers = ({ show, list, emoji, onClose }) => {
  return useObserver(() => (
    <ActionSheet
      show={show}
      height={list.length < 10 ? 480 : 640}
      title={
        <Flex style={_.mb.sm} justify='center'>
          {emoji > 100 ? (
            <Bgm
              style={styles.image}
              index={emoji}
              size={IOS ? 16 : 14}
              textOnly={false}
            />
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
          .sort((a, b) =>
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
                  {!!avatar && <Avatar style={_.mr.sm} size={32} src={avatar} />}
                  <Text size={13} bold>
                    {item.nickname}{' '}
                    <Text type='sub' size={10} lineHeight={13} bold>
                      @{item.username}
                    </Text>
                  </Text>
                </Flex>
              </Touchable>
            )
          })}
      </View>
    </ActionSheet>
  ))
}
