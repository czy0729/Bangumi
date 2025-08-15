/*
 * @Author: czy0729
 * @Date: 2024-06-07 07:29:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 16:26:54
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { IconTouchable, Likes } from '@_'
import { _, uiStore, useStore } from '@stores'
import { getTimestamp, HTMLDecode, lastDate, removeHTMLTag, stl } from '@utils'
import { ob } from '@utils/decorators'
import { LIKE_TYPE_RAKUEN } from '@constants'
import { TopicId } from '@types'
import { Ctx } from '../../../types'
import Title from '../title'
import { removeHtmlEntities } from './utils'
import { memoStyles } from './styles'

function Comment({ topicId }) {
  const { $, navigation } = useStore<Ctx>()
  const data = $.comment(topicId)
  if (!data.length) return null

  const styles = memoStyles()
  return (
    <View style={styles.comment}>
      {data.map((item, index) => (
        <View key={item.id} style={stl(styles.item, index && styles.border)}>
          <Flex>
            <Flex.Item>
              <Title size={12} lineHeight={14} numberOfLines={4}>
                <Text size={12} lineHeight={14} type='sub'>
                  {lastDate(getTimestamp(item.time))} {item.floor}：
                </Text>
                {removeHtmlEntities(HTMLDecode(removeHTMLTag(item.message, false))).replace(
                  /\[来自Bangumi for (iOS|android)\] 获取/,
                  ''
                )}
              </Title>
            </Flex.Item>
            <IconTouchable
              style={_.mr._sm}
              name='md-navigate-next'
              onPress={() => {
                navigation.push('Topic', {
                  topicId: `${topicId}#post_${item.id}` as TopicId
                })
              }}
            />
          </Flex>
          <Likes
            style={styles.likes}
            topicId={topicId}
            id={item.id}
            likeType={LIKE_TYPE_RAKUEN}
            onPress={uiStore.showLikesUsers}
          />
        </View>
      ))}
    </View>
  )
}

export default ob(Comment)
