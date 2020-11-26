/*
 * @Author: czy0729
 * @Date: 2019-04-30 18:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-26 11:39:38
 */
import React from 'react'
import { Alert, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Katakana, Text, Touchable, RenderHtml } from '@components'
import { Avatar, Name } from '@screens/_'
import { _ } from '@stores'
import { getTimestamp, simpleTime, open } from '@utils'
import { appNavigate } from '@utils/app'
import { HOST, EVENT } from '@constants'

const avatarWidth = 32
const imagesMaxWidth = _.window.width - 2 * _.wind - avatarWidth - _.sm
const imagesMaxWidthSub =
  _.window.width - 2 * _.wind - 2 * avatarWidth - 2 * _.sm
const expandNum = 5

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
      style={[styles.item, isNew && styles.itemNew, isJump && styles.itemJump]}
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
                <>
                  {isAuthor && (
                    <Text type='main' size={11} lineHeight={14}>
                      {' '}
                      作者
                    </Text>
                  )}
                  {isFriend && !isAuthor && (
                    <Text type='warning' size={11} lineHeight={14}>
                      {' '}
                      好友
                    </Text>
                  )}
                </>
              }
            >
              {userName}
            </Name>
          </Flex.Item>
          <Text
            style={[styles.time, _.ml.md]}
            type='sub'
            size={11}
            lineHeight={14}
          >
            {simpleTime(time)}
          </Text>
          <Text style={styles.f} type='sub' size={10} lineHeight={14}>
            #
          </Text>
          <Text style={styles.time} type='sub' size={11} lineHeight={14}>
            {floor.replace('#', '')}
          </Text>
        </Flex>
        {!!userSign && (
          <View style={styles.sign}>
            <Katakana.Provider size={11} numberOfLines={1}>
              <Katakana type='sub' size={11}>
                {userSign.slice(1, userSign.length - 1)}
              </Katakana>
            </Katakana.Provider>
          </View>
        )}
        <RenderHtml
          style={_.mt.sm}
          baseFontStyle={styles.baseFontStyle}
          imagesMaxWidth={imagesMaxWidth}
          html={message}
          onLinkPress={href => appNavigate(href, navigation, {}, event)}
          onImageFallback={() => open(`${url}#post_${id}`)}
        />
        <Flex justify='end'>
          {!!erase && (
            <Touchable
              style={[styles.reply, _.mr.sm]}
              onPress={() =>
                Alert.alert('警告', '确定删除回复?', [
                  {
                    text: '取消',
                    style: 'cancel'
                  },
                  {
                    text: '确定',
                    onPress: () => $.doDeleteReply(erase)
                  }
                ])
              }
            >
              <Text type='icon' size={11}>
                删除
              </Text>
            </Touchable>
          )}
          {!!replySub && (
            <Touchable
              style={styles.reply}
              onPress={() => {
                $.showFixedTextarea(userName, replySub)
                showFixedTextare()
              }}
            >
              <Text type='icon' size={11}>
                回复
              </Text>
            </Touchable>
          )}
        </Flex>
        <View style={styles.sub}>
          {sub
            .filter((item, index) => (isExpand ? true : index < expandNum))
            .map(item => {
              const isAuthor = authorId === item.userId
              const isLayer = !isAuthor && userId === item.userId
              const isFriend = $.myFriendsMap[item.userId]
              const isNew = !!readedTime && getTimestamp(item.time) > readedTime
              const isJump = !!postId && postId === item.id
              return (
                <Flex
                  key={item.id}
                  style={[isNew && styles.itemNew, isJump && styles.itemJump]}
                  align='start'
                >
                  <Avatar
                    style={styles.subImage}
                    navigation={navigation}
                    userId={item.userId}
                    name={item.userName}
                    src={item.avatar}
                    event={event}
                  />
                  <Flex.Item
                    style={[
                      styles.subContent,
                      !_.flat && styles.border,
                      _.ml.sm
                    ]}
                  >
                    <Flex>
                      <Flex.Item>
                        <Name
                          userId={item.userId}
                          size={item.userName.length > 10 ? 12 : 14}
                          lineHeight={14}
                          bold
                          right={
                            <>
                              {isAuthor && (
                                <Text type='main' size={11} lineHeight={14}>
                                  {' '}
                                  作者
                                </Text>
                              )}
                              {isFriend && !isAuthor && (
                                <Text type='warning' size={11} lineHeight={14}>
                                  {' '}
                                  好友
                                </Text>
                              )}
                              {isLayer && !isAuthor && !isFriend && (
                                <Text type='primary' size={11} lineHeight={14}>
                                  {' '}
                                  层主
                                </Text>
                              )}
                            </>
                          }
                        >
                          {item.userName}
                        </Name>
                      </Flex.Item>
                      <Text
                        style={[styles.time, _.ml.md]}
                        type='sub'
                        size={11}
                        lineHeight={14}
                      >
                        {simpleTime(item.time)}
                      </Text>
                      <Text
                        style={styles.f}
                        type='sub'
                        size={10}
                        lineHeight={14}
                      >
                        #
                      </Text>
                      <Text
                        style={styles.time}
                        type='sub'
                        size={11}
                        lineHeight={14}
                      >
                        {item.floor.replace('#', '')}
                      </Text>
                    </Flex>
                    <RenderHtml
                      style={_.mt.xs}
                      baseFontStyle={styles.baseFontStyle}
                      imagesMaxWidth={imagesMaxWidthSub}
                      html={item.message}
                      onLinkPress={href =>
                        appNavigate(href, navigation, {}, event)
                      }
                      onImageFallback={() => open(`${url}#post_${item.id}`)}
                    />
                    <Flex justify='end'>
                      {!!item.erase && (
                        <Touchable
                          style={[styles.reply, _.mr.sm]}
                          onPress={() =>
                            Alert.alert('警告', '确定删除回复?', [
                              {
                                text: '取消',
                                style: 'cancel'
                              },
                              {
                                text: '确定',
                                onPress: () => $.doDeleteReply(item.erase)
                              }
                            ])
                          }
                        >
                          <Text type='icon' size={11}>
                            删除
                          </Text>
                        </Touchable>
                      )}
                      {!!item.replySub && (
                        <Touchable
                          style={styles.reply}
                          onPress={() => {
                            $.showFixedTextarea(
                              item.userName,
                              item.replySub,
                              item.message
                            )
                            showFixedTextare()
                          }}
                        >
                          <Text type='icon' size={11}>
                            回复
                          </Text>
                        </Touchable>
                      )}
                    </Flex>
                  </Flex.Item>
                </Flex>
              )
            })}
          {sub.length > expandNum && (
            <Touchable onPress={() => $.toggleExpand(id)}>
              <Text
                style={styles.expand}
                type={isExpand ? 'sub' : 'main'}
                size={12}
                align='center'
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

Item.defaultProps = {
  sub: [],
  event: EVENT
}

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Item)

const memoStyles = _.memoStyles(_ => ({
  item: {
    ..._.container.item
  },
  itemOdd: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  },
  itemNew: {
    backgroundColor: _.colorMainLight
  },
  itemJump: {
    borderWidth: 2,
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
  sign: {
    marginTop: 2,
    opacity: _.select(1, 0.64)
  },
  sub: {
    marginTop: _.md,
    marginBottom: -_.md
  },
  subImage: {
    marginTop: _.md
  },
  subContent: {
    paddingVertical: _.md
  },
  reply: {
    padding: _.sm,
    marginTop: -_.sm,
    marginRight: -_.sm,
    marginBottom: -_.md,
    opacity: _.select(1, 0.64)
  },
  time: {
    opacity: _.select(1, 0.64)
  },
  f: {
    marginTop: -8,
    marginLeft: _.sm,
    opacity: _.select(1, 0.64)
  },
  baseFontStyle: {
    fontSize: 14 + _.fontSizeAdjust,
    lineHeight: 22
  },
  expand: {
    paddingVertical: _.sm,
    paddingLeft: 44
  }
}))
