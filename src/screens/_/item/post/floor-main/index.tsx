/*
 * @Author: czy0729
 * @Date: 2024-01-23 18:48:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-03 07:23:49
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { HTMLDecode, stl } from '@utils'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { IMAGES_MAX_WIDTH } from '../ds'
import { Likes, Name } from '../../../base'
import CollapsedHtml from '../collapsed-html'
import FloorText from '../floor-text'
import IconExtra from '../icon-extra'
import UserLabel from '../user-label'
import { memoStyles } from './styles'

function FloorMain({
  contentStyle,
  extraStyle,
  topicId,
  erase,
  floor,
  id,
  isAuthor,
  isFriend,
  isNew,
  matchLink,
  msg,
  replySub,
  time,
  translate,
  url,
  userId,
  userName,
  userSign,
  formhash,
  likeType,
  event,
  onJumpTo,
  onLikesLongPress,
  onShowFixedTextare
}) {
  const navigation = useNavigation()
  const styles = memoStyles()
  return (
    <Flex.Item style={stl(styles.content, contentStyle)}>
      <Flex align='start'>
        <Flex.Item>
          <Name
            userId={userId}
            size={userName.length > 10 ? 12 : 14}
            lineHeight={14}
            bold
            right={<UserLabel isAuthor={isAuthor} isFriend={isFriend} userSign={userSign} />}
          >
            {HTMLDecode(userName)}
          </Name>
        </Flex.Item>
        <IconExtra
          style={extraStyle}
          topicId={topicId}
          id={id}
          formhash={formhash}
          likeType={likeType}
          msg={msg}
          replySub={replySub}
          erase={erase}
          userId={userId}
          userName={userName}
          onJumpTo={onJumpTo}
          onShowFixedTextare={onShowFixedTextare}
        />
      </Flex>
      <FloorText time={time} floor={floor} isNew={isNew} />
      <View style={styles.html}>
        <CollapsedHtml
          navigation={navigation}
          id={id}
          msg={msg}
          url={url}
          imagesMaxWidth={IMAGES_MAX_WIDTH}
          matchLink={matchLink}
          event={event}
        />
        <Likes
          style={styles.likes}
          topicId={topicId}
          id={id}
          formhash={formhash}
          likeType={likeType}
          onLongPress={onLikesLongPress}
        />
      </View>
      {!!translate && (
        <Text style={styles.translate} size={11} lineHeight={13}>
          {translate.trim()}
        </Text>
      )}
    </Flex.Item>
  )
}

export default ob(FloorMain)
