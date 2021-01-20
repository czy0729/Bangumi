/*
 * @Author: czy0729
 * @Date: 2019-04-30 18:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-20 20:05:12
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable, RenderHtml } from '@components'
import { Avatar, Name } from '@screens/_'
import { _ } from '@stores'
import { getTimestamp, open } from '@utils'
import { obc } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { HOST, EVENT } from '@constants'
import UserLabel from '../user-label'
import FloorText from '../floor-text'
import IconExtra from '../icon/extra'
import ItemSub from './sub'

const avatarWidth = 32
const imagesMaxWidth = _.window.width - 2 * _.wind - avatarWidth - _.sm
const expandNum = 4

function Item(
  {
    index,
    id,
    postId, // 存在就跳转到对应楼层
    authorId,
    avatar,
    userId,
    userName,
    userSign,
    message,
    floor,
    time,
    sub,
    replySub,
    erase,
    showFixedTextare,
    event
  },
  { $, navigation }
) {
  const msg = decoder(message)
  if ($.filterDelete && msg.includes('内容已被用户删除')) {
    return null
  }

  const styles = memoStyles()
  const { expands } = $.state
  const isExpand =
    sub.length <= expandNum || (sub.length > expandNum && expands.includes(id))

  const isAuthor = authorId === userId
  const isFriend = $.myFriendsMap[userId]
  const isJump = !!postId && postId === id
  const { _time: readedTime } = $.readed
  const isNew = !!readedTime && getTimestamp(time) > readedTime

  const { _url } = $.params
  const url = _url || `${HOST}/rakuen/topic/${$.topicId}`
  return (
    <Flex
      style={[
        _.container.item,
        isNew && styles.itemNew,
        isJump && styles.itemJump
      ]}
      align='start'
    >
      <Avatar
        style={styles.image}
        navigation={navigation}
        userId={userId}
        name={userName}
        src={avatar}
        event={event}
      />
      <Flex.Item
        style={[styles.content, index !== 0 && !_.flat && styles.border]}
      >
        <Flex>
          <Flex.Item>
            <Name
              userId={userId}
              size={userName.length > 10 ? 12 : 14}
              lineHeight={14}
              bold
              right={
                <UserLabel
                  isAuthor={isAuthor}
                  isFriend={isFriend}
                  userSign={userSign}
                />
              }
              numberOfLines={1}
            >
              {userName}
            </Name>
          </Flex.Item>
          <IconExtra
            replySub={replySub}
            erase={erase}
            userName={userName}
            showFixedTextare={showFixedTextare}
          />
        </Flex>
        <FloorText time={time} floor={floor} />
        <RenderHtml
          style={_.mt.sm}
          baseFontStyle={_.baseFontStyle.md}
          imagesMaxWidth={imagesMaxWidth}
          html={message}
          onLinkPress={href => appNavigate(href, navigation, {}, event)}
          onImageFallback={() => open(`${url}#post_${id}`)}
        />
        <View style={styles.sub}>
          {sub
            .filter((item, index) => (isExpand ? true : index < expandNum))
            .map(item => (
              <ItemSub
                key={item.id}
                id={item.id}
                message={item.message}
                userId={item.userId}
                userName={item.userName}
                avatar={item.avatar}
                floor={item.floor}
                erase={item.erase}
                replySub={item.replySub}
                time={item.time}
                postId={postId}
                authorId={authorId}
                uid={userId}
                url={url}
                readedTime={readedTime}
                showFixedTextare={showFixedTextare}
                event={event}
              />
            ))}
          {sub.length > expandNum && (
            <Touchable onPress={() => $.toggleExpand(id)}>
              <Text
                style={styles.expand}
                type={isExpand ? 'sub' : 'main'}
                size={12}
                align='center'
                bold
              >
                {isExpand
                  ? '收起楼层'
                  : `展开 ${sub.length - expandNum} 条回复`}
              </Text>
            </Touchable>
          )}
        </View>
      </Flex.Item>
    </Flex>
  )
}

export default obc(Item, {
  sub: [],
  event: EVENT
})

const memoStyles = _.memoStyles(_ => ({
  itemNew: {
    backgroundColor: _.colorMainLight
  },
  itemJump: {
    borderWidth: 1,
    borderColor: _.colorWarning
  },
  image: {
    marginTop: _.space,
    marginLeft: _.wind
  },
  content: {
    paddingVertical: _.space,
    paddingRight: _.wind,
    marginLeft: _.sm
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  sub: {
    marginTop: _.md,
    marginBottom: -_.md
  },
  expand: {
    paddingTop: _.sm,
    paddingBottom: _.md,
    marginLeft: 44
  }
}))
