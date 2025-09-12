/*
 * @Author: czy0729
 * @Date: 2024-06-22 16:48:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 02:10:51
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { Avatar, InView, Name } from '@_'
import { _, rakuenStore } from '@stores'
import { ReviewsItem } from '@stores/rakuen/types'
import { getIsBlockedUser, HTMLDecode } from '@utils'
import { useNavigation, useObserver } from '@utils/hooks'
import { WithIndex } from '@types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Item({
  index,
  id,
  title,
  replies,
  time,
  content,
  avatar,
  userId,
  userName
}: WithIndex<ReviewsItem>) {
  const navigation = useNavigation(COMPONENT)

  return useObserver(() => {
    if (getIsBlockedUser(rakuenStore.blockUserIds, userName, userId, `Reviews|${id}`)) return null

    const styles = memoStyles()
    return (
      <Touchable
        style={styles.item}
        animate
        onPress={() => {
          navigation.push('Blog', {
            blogId: id
          })
        }}
      >
        <Flex style={styles.wrap} align='start'>
          <InView style={styles.inView} y={150 * (index + 1)}>
            <Avatar navigation={navigation} userId={userId} name={userName} src={avatar} />
          </InView>
          <Flex.Item>
            <Text size={15} bold>
              {HTMLDecode(title)}
              {replies !== '+0' && (
                <Text type='main' size={12} lineHeight={15} bold>
                  {'  '}
                  {replies}
                </Text>
              )}
            </Text>
            <Text style={_.mt.xs} type='sub' size={12}>
              {time} /{' '}
              <Name userId={userId} showFriend type='sub' size={12}>
                {userName}
              </Name>
            </Text>
            <Text style={_.mt.sm} size={13} lineHeight={15} numberOfLines={4}>
              {content}
            </Text>
          </Flex.Item>
        </Flex>
      </Touchable>
    )
  })
}

export default Item
