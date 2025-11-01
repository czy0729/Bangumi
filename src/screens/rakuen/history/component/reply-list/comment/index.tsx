/*
 * @Author: czy0729
 * @Date: 2024-06-07 07:29:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-01 21:36:14
 */
import React from 'react'
import { View } from 'react-native'
import { BgmText, Flex, Text } from '@components'
import { IconTouchable, Likes } from '@_'
import { _, uiStore, useStore } from '@stores'
import { getTimestamp, HTMLDecode, lastDate, removeHTMLTag, stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { LIKE_TYPE_RAKUEN } from '@constants'
import Title from '../title'
import { parseEmojis, removeHtmlEntities } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { TopicId } from '@types'
import type { Ctx } from '../../../types'
import type { Props } from './types'

function Comment({ topicId }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const data = $.comment(topicId)
    if (!data.length) return null

    const styles = memoStyles()
    const textProps = {
      size: 12,
      lineHeight: 16
    } as const

    return (
      <View style={styles.comment}>
        {data.map((item, index) => (
          <View key={item.id} style={stl(styles.item, index && styles.border)}>
            <Flex>
              <Flex.Item>
                <Title {...textProps} numberOfLines={4}>
                  <Text type='sub' {...textProps} bold>
                    {lastDate(getTimestamp(item.time))} {item.floor}：
                  </Text>
                  {parseEmojis(HTMLDecode(item.message)).map((i, idx) =>
                    typeof i === 'object' ? (
                      <BgmText key={idx} index={i.id} {...textProps} />
                    ) : (
                      <Text key={idx} {...textProps}>
                        {removeHtmlEntities(removeHTMLTag(i, false))}
                      </Text>
                    )
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
  })
}

export default Comment
