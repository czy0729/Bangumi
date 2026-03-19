/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:42:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 04:40:04
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Avatar, Component, Flex, Text, Touchable, UserStatus } from '@components'
import { _ } from '@stores'
import { appNavigate, date, HTMLDecode } from '@utils'
import { r } from '@utils/dev'
import { EVENT } from '@constants'
import { Name } from '../../base'
import { COMPONENT, Y } from './ds'
import { memoStyles } from './styles'

import type { Props as ItemArticleProps } from './types'
export type { ItemArticleProps }

export const ItemArticle = observer(
  ({
    navigation,
    style,
    avatar,
    title,
    summary,
    nickname,
    userId,
    timestamp,
    replies,
    url,
    event = EVENT
  }: ItemArticleProps) => {
    r(COMPONENT)

    const styles = memoStyles()

    let time = date('y-m-d', timestamp)
    if (time.indexOf(`${Y}-`) !== -1) time = time.replace(`${Y}-`, '')

    return (
      <Component id='item-article' data-key={url}>
        <Touchable style={style} animate onPress={() => appNavigate(url, navigation, {}, event)}>
          <Flex align='start'>
            <View style={styles.cover}>
              <UserStatus userId={userId}>
                <Avatar
                  navigation={navigation}
                  userId={userId}
                  name={nickname}
                  src={avatar}
                  event={event}
                />
              </UserStatus>
            </View>
            <Flex.Item style={styles.item}>
              <Text lineHeight={16} bold>
                {HTMLDecode(title)}
              </Text>
              <Flex style={_.mt.xs}>
                <Name size={12} bold userId={userId} showFriend>
                  {HTMLDecode(nickname)}
                </Name>
                <Text type='sub' style={_.ml.xs} size={12}>
                  / {time}
                  {replies ? ` / +${replies}` : ''}
                </Text>
              </Flex>
              {!!summary && (
                <Text style={_.mt.sm} size={13} lineHeight={15} numberOfLines={3}>
                  {HTMLDecode(summary.replace(/\r\n\r\n/g, '\r\n'))}
                </Text>
              )}
            </Flex.Item>
          </Flex>
        </Touchable>
      </Component>
    )
  }
)

export default ItemArticle
