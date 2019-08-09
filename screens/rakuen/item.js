/*
 * @Author: czy0729
 * @Date: 2019-04-27 20:21:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 10:28:03
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { Popover, Avatar } from '@screens/_'
import { open } from '@utils'
import { findBangumiCn, appNavigate } from '@utils/app'
import { info } from '@utils/ui'
import { HOST, IMG_DEFAULT_AVATAR, TOPIC_PUSH_LIMIT } from '@constants'
import _ from '@styles'

const Item = (
  {
    style,
    index,
    href = '',
    avatar,
    userName,
    title,
    replies = '',
    group,
    groupHref,
    time
  },
  { $, navigation }
) => {
  const { isBlockDefaultUser, blockGroups, blockUserIds } = $.setting
  const groupCn = findBangumiCn(group)

  // 处理屏蔽小组
  if (blockGroups.includes(groupCn)) {
    return null
  }

  // 匹配userId, 有userId的头像可以跳转到用户空间
  let userId
  const match = avatar.match(/\/(\d+).jpg/)
  if (match) {
    userId = match[1]
  }

  // 处理屏蔽用户
  const findIndex = blockUserIds.findIndex(item => {
    const [itemUserName, itemUserId] = item.split('@')
    if (itemUserId === 'undefined') {
      return itemUserName === userName
    }
    return itemUserId === userId
  })
  if (findIndex !== -1) {
    return null
  }

  // 设置开启屏蔽默认头像, 且回复数小于4, 鉴定为广告姬
  const replyCount = parseInt(replies.match(/\d+/g))
  if (isBlockDefaultUser && avatar === IMG_DEFAULT_AVATAR && replyCount < 4) {
    return null
  }

  const isTop = index === 0
  const topicId = href.replace('/rakuen/topic/', '')
  const readed = $.readed(topicId)
  const isReaded = !!readed.time

  // 处理 (+30) +10 样式
  const replyText = `+${replyCount}`
  let replyAdd
  if (isReaded) {
    if (replyCount > readed.replies) {
      replyAdd = `+${replyCount - readed.replies}`
    }
  }

  // 帖子点击
  const onPress = () => {
    if (replyCount > TOPIC_PUSH_LIMIT) {
      info('该帖评论多, 自动使用浏览器打开')
      setTimeout(() => {
        open(`${HOST}${href}`)
      }, 1600)
    } else {
      // 记录帖子查看历史详情
      $.onItemPress(topicId, replyCount)
      appNavigate(href, navigation, {
        _title: title,
        _replies: `(+${replyCount})`,
        _group: group,
        _time: time,
        _avatar: avatar,
        _userName: userName,
        _userId: userId
      })
    }
  }

  // 类别进入点击
  let type
  if (topicId.includes('group/')) {
    type = '小组'
  } else if (topicId.includes('subject/') || topicId.includes('ep/')) {
    type = '条目'
  } else {
    type = '人物'
  }

  // 只有小组和条目可以屏蔽用户
  const popoverData = [`进入${type}`]
  if (topicId.includes('group/') || topicId.includes('subject/')) {
    popoverData.push(`屏蔽${type}`, '屏蔽用户')
  } else {
    popoverData.push(`屏蔽${type}`)
  }

  return (
    <View style={[styles.container, isReaded && styles.readed, style]}>
      <Flex align='start'>
        <Avatar
          style={styles.image}
          navigation={navigation}
          src={avatar}
          userId={userId}
        />
        <Flex.Item style={!isTop && styles.border}>
          <Flex align='start'>
            <Flex.Item>
              <Touchable style={styles.item} highlight onPress={onPress}>
                <Text size={16}>
                  {title}
                  <Text
                    type={isReaded ? 'sub' : 'main'}
                    size={12}
                    lineHeight={16}
                  >
                    {' '}
                    ({replyText})
                  </Text>
                  {!!replyAdd && (
                    <Text type='main' size={12} lineHeight={16}>
                      {' '}
                      {replyAdd}
                    </Text>
                  )}
                </Text>
                <Text style={_.mt.sm} type='sub' size={12}>
                  {correctTime(time)}
                  {groupCn ? ' / ' : ''}
                  <Text size={12}>{groupCn}</Text>
                </Text>
              </Touchable>
            </Flex.Item>
            <Popover
              style={styles.extra}
              data={popoverData}
              onSelect={title =>
                $.onExtraSelect(
                  title,
                  {
                    topicId,
                    href,
                    groupCn,
                    groupHref,
                    userId,
                    userName
                  },
                  navigation
                )
              }
            >
              <Iconfont name='extra' />
            </Popover>
          </Flex>
        </Flex.Item>
      </Flex>
    </View>
  )
}

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Item)

const styles = StyleSheet.create({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  readed: {
    backgroundColor: _.colorBg
  },
  image: {
    marginRight: _.xs,
    marginTop: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingLeft: _.sm
  },
  extra: {
    paddingVertical: _.md,
    paddingHorizontal: _.sm
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: StyleSheet.hairlineWidth
  }
})

function correctTime(time = '') {
  let _time = time.replace('...', '')
  if (_time.indexOf(' ago') === -1) {
    _time = _time.replace('ago', ' ago')
  }
  return _time
}
