/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:42:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-08 16:35:35
 */
import React from 'react'
import { Flex, Text, Touchable, UserStatus } from '@components'
import { _ } from '@stores'
import { date } from '@utils'
import { appNavigate } from '@utils/app'
import { HTMLDecode } from '@utils/html'
import { ob } from '@utils/decorators'
import { EVENT } from '@constants'
import { Avatar, Name } from '../../base'
import { memoStyles } from './styles'
import { Props as ItemArticleProps } from './types'

export { ItemArticleProps }

const D = new Date()
const Y = String(D.getFullYear()).slice(2, 4)

export const ItemArticle = ob(
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
    const styles = memoStyles()
    let time = date('y-m-d', timestamp)
    if (time.indexOf(`${Y}-`) !== -1) time = time.replace(`${Y}-`, '')
    return (
      <Touchable style={style} onPress={() => appNavigate(url, navigation, {}, event)}>
        <Flex align='start'>
          <UserStatus userId={userId}>
            <Avatar
              style={styles.image}
              userId={userId}
              name={nickname}
              src={avatar}
              event={event}
              navigation={navigation}
            />
          </UserStatus>
          <Flex.Item style={styles.item}>
            <Text bold>{HTMLDecode(title)}</Text>
            <Flex style={_.mt.xs}>
              <Name userId={userId} showFriend size={12} bold>
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
    )
  }
)
