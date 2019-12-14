/*
 * @Author: czy0729
 * @Date: 2019-05-01 20:14:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-14 20:01:30
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import {
  HeaderPlaceholder,
  Flex,
  Image,
  Text,
  RenderHtml,
  Divider,
  Loading
} from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { simpleTime } from '@utils'
import { findBangumiCn, appNavigate } from '@utils/app'
import { HOST, IOS } from '@constants'
import SectionTitle from './section-title'

function Top(props, { $, navigation }) {
  const {
    title,
    groupThumb,
    group,
    groupHref,
    time,
    avatar,
    userName,
    userId,
    userSign,
    message,
    _loaded
  } = $.topic
  const {
    _title,
    _replies,
    _group,
    _time,
    _avatar,
    _userName,
    _userId
  } = $.params

  // ep带上章节详情
  const html = $.isEp ? $.epFormHTML : message
  const userAvatar = avatar || _avatar
  const uname = userName || _userName
  const uid = userId || _userId
  const _groupThumb = groupThumb || $.groupThumb

  // 人物这里不显示详情, 所以要把小组的相关信息替换成人物信息, 跳转到人物页面查看
  let groupName = group || _group
  let groupPress = () =>
    appNavigate(groupHref, navigation, {
      _jp: group
    })
  if ($.isMono) {
    groupName = title || _title
    groupPress = () => appNavigate(`${HOST}/${$.monoId}`, navigation)
  }

  const isGroup = $.topicId.includes('group/')
  return (
    <>
      {!IOS && <HeaderPlaceholder />}
      <View style={_.container.inner}>
        <Text type='title' size={20} bold>
          {title || _title}
          {!!_replies && (
            <Text type='main' size={12} lineHeight={26}>
              {' '}
              {_replies}
            </Text>
          )}
        </Text>
        <Flex style={[styles.groupWrap, _.mt.sm]}>
          <View style={styles.groupThumbWrap}>
            {!!_groupThumb && (
              <Image
                size={28}
                src={_groupThumb}
                radius
                border={_.colorBorder}
                placeholder={false}
                onPress={groupPress}
              />
            )}
          </View>
          <Text style={_.ml.sm}>
            <Text size={13} underline numberOfLines={1} onPress={groupPress}>
              {findBangumiCn(groupName)}
            </Text>
            {!!time && (
              <>
                <Text style={_.ml.sm} type='sub' size={13}>
                  {' '}
                  /{' '}
                </Text>
                <Text type='sub' size={13}>
                  {simpleTime(time || _time)}
                </Text>
              </>
            )}
          </Text>
        </Flex>
        {isGroup && (
          <Flex style={[styles.userWrap, _.mt.md]}>
            <View style={styles.userAvatarWrap}>
              {!!userAvatar && (
                <Avatar
                  navigation={navigation}
                  size={40}
                  src={_avatar || userAvatar}
                  userId={userId}
                />
              )}
            </View>
            {!!uid && (
              <Flex.Item style={_.ml.sm}>
                <Text numberOfLines={2}>
                  {uname}
                  <Text type='sub'> @{uid}</Text>
                </Text>
                {!!_loaded && !userSign ? null : (
                  <Text style={_.mt.xs} type='sub' size={12}>
                    {userSign || '-'}
                  </Text>
                )}
              </Flex.Item>
            )}
          </Flex>
        )}
        <View style={styles.html}>
          {isGroup && !_loaded && (
            <Flex style={styles.loading} justify='center'>
              <Loading />
            </Flex>
          )}
          {!!html && (
            <RenderHtml
              style={_.mt.lg}
              html={html}
              // autoShowImage
              onLinkPress={href => appNavigate(href, navigation)}
            />
          )}
        </View>
      </View>
      <Divider />
      <SectionTitle />
    </>
  )
}

Top.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Top)

const styles = StyleSheet.create({
  groupWrap: {
    height: 32
  },
  groupThumbWrap: {
    width: 30
  },
  userWrap: {
    height: 42
  },
  userAvatarWrap: {
    width: 40
  },
  html: {
    minHeight: 120
  },
  loading: {
    height: 120
  }
})
