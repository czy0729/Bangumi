/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:43:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-01 18:04:18
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { _, uiStore, userStore } from '@stores'
import { correctAgo, HTMLDecode, stl } from '@utils'
import { memo } from '@utils/decorators'
import { LIKE_TYPE_TIMELINE, WEB } from '@constants'
import { Likes, Name, Popover, Stars, UserStatusAvatar } from '../../base'
import { formatTime } from './utils'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const ItemComment = memo(
  ({
    navigation,
    styles,
    style,
    time,
    avatar,
    userId,
    userName,
    star,
    status,
    comment,
    subjectId,
    relatedId,
    mainId,
    mainName,
    event,
    popoverData,
    like,
    onSelect
  }) => {
    return (
      <Flex style={stl(styles.item, style)} align='start'>
        <UserStatusAvatar
          style={styles.avatar}
          navigation={navigation}
          like={like}
          userId={userId}
          userName={userName}
          avatar={avatar}
          event={event}
        />
        <Flex.Item style={styles.content}>
          <Flex>
            <Flex.Item>
              <Name
                size={14}
                bold
                userId={userId}
                showFriend
                right={
                  <Text type='sub' size={11} lineHeight={14}>
                    {'  '}
                    {status ? `${status} · ` : ''}
                    {String(time).includes('ago') ? correctAgo(formatTime(time)) : time}
                  </Text>
                }
              >
                {userName}
              </Name>
            </Flex.Item>
            {!!popoverData && typeof onSelect === 'function' && (
              <Popover
                key={userId}
                style={styles.touch}
                data={popoverData}
                onSelect={title => {
                  onSelect(
                    title,
                    {
                      avatar,
                      userId,
                      userName
                    },
                    comment,
                    relatedId
                  )
                }}
              >
                <Flex style={styles.icon} justify='center'>
                  <Iconfont style={_.ml.md} name='md-more-vert' size={18} />
                </Flex>
              </Popover>
            )}
          </Flex>
          {!!(star || mainName) && (
            <Flex style={styles.stars}>
              <Stars value={star} />
              {!!mainName && (
                <>
                  {!!star && (
                    <Text type='sub' size={11}>
                      {' · '}
                    </Text>
                  )}
                  <Text
                    type='sub'
                    size={11}
                    underline
                    numberOfLines={1}
                    onPress={() => {
                      if (navigation && mainId) {
                        navigation.push('Subject', {
                          subjectId: mainId,
                          _jp: mainName
                        })
                      }
                    }}
                  >
                    {mainName}
                  </Text>
                </>
              )}
            </Flex>
          )}
          {!!comment && (
            <Text style={_.mt.xs} lineHeight={18} selectable={WEB}>
              {HTMLDecode(comment)}
            </Text>
          )}
          <Likes
            topicId={subjectId}
            id={relatedId}
            likeType={LIKE_TYPE_TIMELINE}
            formhash={userStore.formhash}
            onLongPress={uiStore.showLikesUsers}
          />
        </Flex.Item>
      </Flex>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default ItemComment
