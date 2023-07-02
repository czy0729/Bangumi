/*
 * @Author: czy0729
 * @Date: 2023-07-02 05:34:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-02 10:23:08
 */
import React from 'react'
import { View } from 'react-native'
import { ActionSheet, Touchable, Flex, Text, BgmText, Bgm } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { desc } from '@utils'
import { obc } from '@utils/decorators'
import CacheManager from '@utils/cache-manager'
import { IOS } from '@constants'
import { Ctx } from '../types'
import { styles } from './styles'

function LikesUsers(props, { $, navigation }: Ctx) {
  const { show, list, emoji } = $.state.likesUsers
  return (
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
      onClose={$.closeLikesUsers}
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
                  $.closeLikesUsers()

                  setTimeout(() => {
                    navigation.push('Zone', {
                      userId: item.username,
                      _name: item.nickname
                    })
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
  )
}

export default obc(LikesUsers)
