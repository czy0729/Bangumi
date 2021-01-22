/*
 * @Author: czy0729
 * @Date: 2019-04-27 20:21:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 20:17:12
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { findSubjectCn } from '@utils/app'
import { IMG_DEFAULT_AVATAR } from '@constants'
import Avatar from './avatar'
import Content from './content'
import BtnPopover from './btn-popover'
import IconFavor from './icon-favor'

const LIMIT_HEAVY_RENDER = _.isPad ? 20 : 10
const adRepliesCount = 4 // 回复数少于的数字, 判断为广告姬

export default
@obc
class Item extends React.Component {
  get topicId() {
    const { href = '' } = this.props
    return href.replace('/rakuen/topic/', '')
  }

  get userId() {
    const { avatar } = this.props

    // 匹配userId, 有userId的头像可以跳转到用户空间
    let userId
    const match = avatar.match(/\/(\d+).jpg/)
    if (match) {
      userId = match[1]
    }

    return userId
  }

  // 回复数
  get replyCount() {
    const { replies = '' } = this.props
    return parseInt(replies.match(/\d+/g))
  }

  // 小组中文
  get groupCn() {
    const { group } = this.props
    return findSubjectCn(group)
  }

  // 是否已读
  get isReaded() {
    const { $ } = this.context
    const readed = $.readed(this.topicId)
    return !!readed.time
  }

  // 是否小组
  get isGroup() {
    return this.topicId.includes('group/')
  }

  // 处理屏蔽小组
  get isBlockGroup() {
    const { $ } = this.context
    const { blockGroups } = $.setting
    return blockGroups.includes(this.groupCn)
  }

  // 处理屏蔽用户
  get isBlockUser() {
    const { $ } = this.context
    const { userName } = this.props
    const { blockUserIds } = $.setting
    const findIndex = blockUserIds.findIndex(item => {
      const [itemUserName, itemUserId] = item.split('@')
      if (itemUserId === 'undefined') {
        return itemUserName === userName
      }
      return itemUserId === this.userId
    })
    return findIndex !== -1
  }

  // 设置开启屏蔽默认头像, 且回复数小于4, 鉴定为广告姬
  get isAd() {
    const { $ } = this.context
    const { avatar } = this.props
    const { isBlockDefaultUser } = $.setting
    return (
      isBlockDefaultUser &&
      avatar === IMG_DEFAULT_AVATAR &&
      this.replyCount < adRepliesCount
    )
  }

  get containerStyle() {
    const { style } = this.props
    return [
      _.container.item,
      this.styles.container,
      this.isReaded && this.styles.readed,
      style
    ]
  }

  get contentStyle() {
    const { index } = this.props
    const isTop = index === 0
    return [this.styles.wrap, !isTop && !_.flat && this.styles.border, _.ml.sm]
  }

  render() {
    const { $ } = this.context
    const {
      index,
      avatar,
      group,
      groupHref,
      href = '',
      time,
      title,
      userName
    } = this.props
    const { _mounted } = $.state
    if (index >= LIMIT_HEAVY_RENDER && !_mounted) {
      return <View style={this.styles.lazy} />
    }

    if (this.isBlockGroup || this.isBlockUser || this.isAd) {
      return null
    }

    return (
      <View style={this.containerStyle}>
        <Flex align='start'>
          <Avatar
            index={index}
            avatar={avatar}
            userName={userName}
            userId={this.userId}
          />
          <Flex.Item style={this.contentStyle}>
            <Flex align='start'>
              <Flex.Item>
                <Content
                  avatar={avatar}
                  group={group}
                  groupCn={this.groupCn}
                  href={href}
                  replyCount={this.replyCount}
                  time={time}
                  title={title}
                  topicId={this.topicId}
                  userId={this.userId}
                  userName={userName}
                  isReaded={this.isReaded}
                  isGroup={this.isGroup}
                />
              </Flex.Item>
              <BtnPopover
                index={index}
                groupCn={this.groupCn}
                groupHref={groupHref}
                href={href}
                topicId={this.topicId}
                userId={this.userId}
                userName={userName}
                isGroup={this.isGroup}
              />
            </Flex>
          </Flex.Item>
        </Flex>
        <IconFavor topicId={this.topicId} />
        {index === 2 && (
          <Heatmap
            id='超展开.跳转'
            data={{
              to: 'Topic',
              alias: '帖子'
            }}
          />
        )}
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  lazy: {
    height: 74
  },
  container: {
    paddingLeft: _.wind,
    paddingVertical: _.flat ? _.xs : 0
  },
  readed: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  },
  wrap: {
    paddingRight: _.wind - _._wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  }
}))
