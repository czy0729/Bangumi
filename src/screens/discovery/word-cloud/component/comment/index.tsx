/*
 * @Author: czy0729
 * @Date: 2024-09-27 03:37:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 04:15:23
 */
import React from 'react'
import { View } from 'react-native'
import { ActionSheet, Avatar, Flex, Highlight, Text, UserStatus } from '@components'
import { Name } from '@_'
import { _ } from '@stores'
import { correctAgo, HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { memoStyles } from './styles'

function Comment(_props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { title } = $.state
  const { length } = $.selectedComment
  return (
    <ActionSheet
      show={$.state.show}
      title={`${title} (${length})`}
      height={length >= 3 ? 680 : 400}
      onClose={$.onClose}
    >
      <View style={styles.container}>
        {$.selectedComment.map(item => {
          const { userId, userName, time, action } = item
          return (
            <Flex key={item.id} style={_.mb.md} align='start'>
              <UserStatus userId={userId}>
                <Avatar
                  navigation={navigation}
                  userId={userId}
                  name={userName}
                  src={item.avatar}
                  size={32}
                />
              </UserStatus>
              <Flex.Item style={_.ml.sm}>
                <Name
                  size={14}
                  bold
                  userId={userId}
                  showFriend
                  right={
                    <Text type='sub' size={11} lineHeight={14}>
                      {'  '}
                      {action ? `${action} · ` : ''}
                      {String(time).includes('ago') ? correctAgo(time) : time}
                    </Text>
                  }
                >
                  {userName}
                </Name>
                <Highlight style={_.mt.xs} size={13} lineHeight={16} value={title} selectable>
                  {HTMLDecode(item.comment)}
                </Highlight>
              </Flex.Item>
            </Flex>
          )
        })}
      </View>
    </ActionSheet>
  )
}

export default obc(Comment)
