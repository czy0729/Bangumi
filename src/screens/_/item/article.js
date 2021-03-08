/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:42:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 19:57:32
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { date } from '@utils'
import { appNavigate } from '@utils/app'
import { HTMLDecode } from '@utils/html'
import { ob } from '@utils/decorators'
import { EVENT } from '@constants'
import { Avatar, Name } from '../base'

const d = new Date()
const y = String(d.getFullYear()).slice(2, 4)

export const ItemArticle = ob(
  ({
    navigation,
    style,
    index,
    avatar,
    title,
    summary,
    nickname,
    userId,
    timestamp,
    replies,
    url,
    event = EVENT
  }) => {
    const styles = memoStyles()
    const isFirst = index === 0
    let time = date('y-m-d', timestamp)
    if (time.indexOf(`${y}-`) !== -1) {
      time = time.replace(`${y}-`, '')
    }
    return (
      <Touchable
        style={style}
        onPress={() => appNavigate(url, navigation, {}, event)}
      >
        <Flex align='start'>
          <Avatar
            style={styles.image}
            userId={userId}
            name={nickname}
            src={avatar}
            event={event}
            navigation={navigation}
          />
          <Flex.Item
            style={[styles.item, !isFirst && !_.flat && styles.border, _.ml.sm]}
          >
            <Text bold>{HTMLDecode(title)}</Text>
            <Flex style={_.mt.xs}>
              <Name userId={userId} showFriend size={12} bold>
                {HTMLDecode(nickname)}
              </Name>
              <Text type='sub' style={_.ml.xs} size={12}>
                / {time} / {replies} 回复
              </Text>
            </Flex>
            {!!summary && (
              <Text style={_.mt.sm} size={13} lineHeight={16} numberOfLines={4}>
                {HTMLDecode(summary.replace(/\r\n\r\n/g, '\r\n'))}
              </Text>
            )}
          </Flex.Item>
        </Flex>
      </Touchable>
    )
  }
)

const memoStyles = _.memoStyles(_ => ({
  image: {
    marginTop: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  }
}))
