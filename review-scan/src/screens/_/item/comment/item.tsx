/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:43:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 04:26:39
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _, uiStore, userStore } from '@stores'
import { HTMLDecode, stl } from '@utils'
import { memo } from '@utils/decorators'
import { EVENT, LIKE_TYPE_TIMELINE, WEB } from '@constants'
import { Likes, UserStatusAvatar } from '../../base'
import Bottom from './bottom'
import Menu from './menu'
import Top from './top'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const ItemComment = memo(
  ({
    navigation,
    styles,
    style,
    time = '',
    avatar = '',
    userId = '',
    userName = '',
    star = '',
    status = '',
    comment = '',
    subjectId = 0,
    relatedId = '',
    mainId = '',
    mainName = '',
    event = EVENT,
    popoverData,
    like = false,
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
              <Top
                userId={userId}
                userName={userName}
                avatar={avatar}
                time={time}
                status={status}
              />
            </Flex.Item>
            {!!popoverData && typeof onSelect === 'function' && (
              <Menu
                key={userId}
                data={popoverData}
                avatar={avatar}
                userId={userId}
                userName={userName}
                comment={comment}
                relatedId={relatedId}
                onSelect={onSelect}
              />
            )}
          </Flex>
          {!!(star || mainName) && (
            <Bottom navigation={navigation} mainId={mainId} mainName={mainName} star={star} />
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
