/*
 * @Author: czy0729
 * @Date: 2023-07-06 13:17:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-06 15:46:46
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _, rakuenStore } from '@stores'
import { memoStyles } from '../styles'
import { Avatar } from '../../../avatar'
import { Flex } from '../../../flex'
import { Text } from '../../../text'
import { Touchable } from '../../../touchable'

function Topic({ topicId, text, onLinkPress }) {
  const styles = memoStyles()
  const { group, avatar, time } = rakuenStore.topic(topicId)

  const { list } = rakuenStore.comments(topicId)
  let reply = 0
  list.forEach(item => {
    reply += 1
    if (item?.sub?.length) reply += item.sub.length
  })

  return (
    <View style={styles.wrap}>
      <Touchable animate onPress={onLinkPress}>
        <Flex style={styles.body}>
          <Avatar src={avatar} size={48} radius={_.radiusSm} />
          <Flex.Item style={_.ml.sm}>
            <Text style={styles.top} size={11} bold numberOfLines={2} selectable>
              {text}{' '}
              {!!time && (
                <Text size={9} lineHeight={11} type='sub' bold>
                  {String(time).split(' ')?.[0]}
                </Text>
              )}
            </Text>
            <Flex style={_.mt.xs}>
              <Text
                style={styles.bottom}
                type='sub'
                size={9}
                lineHeight={10}
                bold
                numberOfLines={2}
                selectable
              >
                {group}
                {reply ? ` · ${reply} 回复` : ''}
              </Text>
            </Flex>
          </Flex.Item>
        </Flex>
      </Touchable>
    </View>
  )
}

export default observer(Topic)
