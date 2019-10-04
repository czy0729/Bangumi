/*
 * @Author: czy0729
 * @Date: 2019-04-27 20:21:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-22 01:18:41
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { Popover, Avatar, StockPreview } from '@screens/_'
import { open } from '@utils'
import { findBangumiCn, appNavigate } from '@utils/app'
import { info } from '@utils/ui'
import { HOST, IMG_DEFAULT_AVATAR, TOPIC_PUSH_LIMIT } from '@constants'
import _ from '@styles'

const adRepliesCount = 4 // 回复数少于的数字, 判断为广告姬
const oldGroupId = 346568 // 少于这个数字的, 为坟贴

export default
@observer
class Item extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  // 小组中文
  get groupCn() {
    const { group } = this.props
    return findBangumiCn(group)
  }

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

  get characters() {
    const { $ } = this.context
    const { href = '' } = this.props
    const characterId = $.characterId(href)
    return $.characters(characterId)
  }

  renderContent() {
    const { $, navigation } = this.context
    const { href = '', avatar, userName, title, group, time } = this.props

    // 处理 (+30) +10 样式
    const replyText = `+${this.replyCount}`
    let replyAdd
    if (this.isReaded) {
      const readed = $.readed(this.topicId)
      if (this.replyCount > readed.replies) {
        replyAdd = `+${this.replyCount - readed.replies}`
      }
    }

    // 帖子点击
    const onPress = () => {
      if (this.replyCount > TOPIC_PUSH_LIMIT) {
        info('该帖评论多, 自动使用浏览器打开')
        setTimeout(() => {
          open(`${HOST}${href}`)
        }, 1600)
      } else {
        // 记录帖子查看历史详情
        $.onItemPress(this.topicId, this.replyCount)
        appNavigate(href, navigation, {
          _title: title,
          _replies: `(+${this.replyCount})`,
          _group: group,
          _time: time,
          _avatar: avatar,
          _userName: userName,
          _userId: this.userId
        })
      }
    }

    // 标记坟贴
    let isOldTopic = false
    if (this.isGroup) {
      const id = parseInt(this.topicId.substring(6))
      if (id < oldGroupId) {
        isOldTopic = true
      }
    }

    const { name } = this.characters
    return (
      <Touchable style={styles.item} highlight onPress={onPress}>
        <Flex align='start'>
          <Flex.Item>
            <Text size={16}>
              {$.cnFirst ? name || title : title}
              <Text
                type={this.isReaded ? 'sub' : 'main'}
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
              {isOldTopic && (
                <Text size={12} lineHeight={16} type='warning'>
                  {' '}
                  (旧帖)
                </Text>
              )}
            </Text>
            <Text style={_.mt.sm} type='sub' size={12}>
              {correctTime(time)}
              {this.groupCn ? ' / ' : ''}
              <Text size={12}>{this.groupCn}</Text>
            </Text>
          </Flex.Item>
        </Flex>
      </Touchable>
    )
  }

  renderPopover() {
    const { $, navigation } = this.context
    const { href = '', userName, groupHref } = this.props
    const isSubject = this.topicId.includes('subject/')

    // 类别进入点击
    let type
    if (this.isGroup) {
      type = '小组'
    } else if (isSubject || this.topicId.includes('ep/')) {
      type = '条目'
    } else {
      type = '人物'
    }

    // 只有小组和条目可以屏蔽用户
    const popoverData = [`进入${type}`]
    if (this.isGroup || isSubject) {
      popoverData.push(`屏蔽${type}`, '屏蔽用户')
    } else {
      popoverData.push(`屏蔽${type}`)
    }

    let monoId
    if ($.tinygrail && this.characters._loaded) {
      if (this.characters.users) {
        popoverData.push('进入ICO')
      } else {
        popoverData.push('进入交易')
      }
      monoId = String(this.characters.id)
    }
    return (
      <Popover
        style={styles.extra}
        contentStyle={{
          borderTopRightRadius: 0
        }}
        data={popoverData}
        onSelect={title =>
          $.onExtraSelect(
            title,
            {
              topicId: this.topicId,
              href,
              groupCn: this.groupCn,
              groupHref,
              userId: this.userId,
              userName,
              monoId
            },
            navigation
          )
        }
      >
        <Iconfont name='extra' />
      </Popover>
    )
  }

  renderStockPreview() {
    const { $ } = this.context

    // 是否显示小圣杯信息
    let showTinygrail = $.tinygrail
    if (showTinygrail) {
      const { id } = this.characters
      if (!id) {
        showTinygrail = false
      }
    }

    if (!showTinygrail) {
      return null
    }

    return <StockPreview {...this.characters} />
  }

  render() {
    const { navigation } = this.context
    const { style, index, avatar } = this.props
    if (this.isBlockGroup) {
      return null
    }

    if (this.isBlockUser) {
      return null
    }

    if (this.isAd) {
      return null
    }

    const isTop = index === 0
    return (
      <View style={[styles.container, this.isReaded && styles.readed, style]}>
        <Flex align='start'>
          <Avatar
            style={styles.image}
            navigation={navigation}
            src={avatar}
            userId={this.userId}
          />
          <Flex.Item style={!isTop && styles.border}>
            <Flex align='start'>
              <Flex.Item>{this.renderContent()}</Flex.Item>
              {this.renderStockPreview()}
              {this.renderPopover()}
            </Flex>
          </Flex.Item>
        </Flex>
      </View>
    )
  }
}

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
