/*
 * @Author: czy0729
 * @Date: 2019-05-01 20:14:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-03 11:29:09
 */
import React from 'react'
import { View } from 'react-native'
import {
  HeaderPlaceholder,
  Touchable,
  Flex,
  Text,
  Divider,
  Loading,
  Heatmap
} from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { simpleTime } from '@utils'
import { memo, obc } from '@utils/decorators'
import { findSubjectCn, appNavigate } from '@utils/app'
import { HTMLDecode } from '@utils/html'
import { HOST, IOS } from '@constants'
import Content from './content'
import Ep from './ep'
import SectionTitle from './section-title'

const defaultProps = {
  navigation: {},
  styles: {},
  topicId: '',
  title: '',
  time: '',
  replies: '',
  group: '',
  groupHref: '',
  groupThumb: '',
  avatar: '',
  userId: '',
  userName: '',
  userSign: '',
  html: '',
  commentsLoaded: false,
  monoId: '',
  isMono: false
}

const Top = memo(
  ({
    navigation,
    styles,
    topicId,
    title,
    time,
    replies,
    group,
    groupHref,
    groupThumb,
    avatar,
    userId,
    userName,
    userSign,
    html,
    commentsLoaded,
    monoId,
    isMono
  }) => {
    rerender('Topic.Top.Main')

    const event = {
      id: '帖子.跳转',
      data: {
        from: '#1',
        topicId
      }
    }

    // 人物这里不显示详情, 所以要把小组的相关信息替换成人物信息, 跳转到人物页面查看
    let groupPress = () =>
      appNavigate(
        groupHref,
        navigation,
        {
          _jp: group
        },
        event
      )
    if (isMono) {
      groupPress = () => appNavigate(`${HOST}/${monoId}`, navigation, {}, event)
    }

    const isGroup = topicId.includes('group/')
    const isEp = topicId.includes('ep/')
    return (
      <>
        {!IOS && <HeaderPlaceholder />}
        <View style={_.container.inner}>
          <Text type='title' size={20} bold>
            {title}
            {!!replies && (
              <Text type='main' size={12} lineHeight={26} bold>
                {' '}
                {replies}
              </Text>
            )}
          </Text>
          <Flex style={styles.groupWrap}>
            <Touchable onPress={groupPress}>
              <Flex style={styles.groupLabel}>
                {!!groupThumb && (
                  <Avatar
                    style={isEp ? _.mr.sm : _.mr.xs}
                    size={isEp ? 40 : 20}
                    src={groupThumb}
                  />
                )}
                <Text size={13} numberOfLines={1}>
                  {HTMLDecode(findSubjectCn(group))}
                </Text>
              </Flex>
            </Touchable>
            {!!time && (
              <Text type='sub' size={13}>
                {simpleTime(time)}
              </Text>
            )}
            <Heatmap
              right={74}
              id='帖子.跳转'
              data={{
                to: 'Group',
                alias: '小组'
              }}
            />
            <Heatmap
              id='帖子.跳转'
              data={{
                to: 'Subject',
                alias: '条目'
              }}
              transparent
            />
          </Flex>
          {isGroup && (
            <Flex style={[styles.userWrap, _.mt.sm]}>
              {!!avatar && (
                <Avatar
                  navigation={navigation}
                  event={event}
                  size={40}
                  src={avatar}
                  userId={userId}
                  name={userName}
                />
              )}
              {!!userId && (
                <Flex.Item style={_.ml.sm}>
                  <Text numberOfLines={1} bold>
                    {userName}
                  </Text>
                  <Text style={_.mt.xs} type='sub' size={12} numberOfLines={1}>
                    @{userId}
                    {!!userSign && ` (${userSign.slice(1, userSign.length - 1)})`}
                  </Text>
                </Flex.Item>
              )}
              <Heatmap
                id='帖子.跳转'
                data={{
                  to: 'Zone',
                  alias: '空间'
                }}
              />
            </Flex>
          )}
          <Content />
        </View>
        <Divider />
        <Ep />
        <SectionTitle />
        {!!html && !commentsLoaded && <Loading style={styles.loading} />}
      </>
    )
  },
  defaultProps
)

export default obc((props, { $, navigation }) => {
  rerender('Topic.Top')

  const { _replies } = $.params
  const { _loaded } = $.comments
  return (
    <Top
      navigation={navigation}
      styles={memoStyles()}
      topicId={$.topicId}
      title={$.title}
      time={$.time}
      replies={_replies}
      group={$.group}
      groupHref={$.groupHref}
      groupThumb={$.groupThumb}
      avatar={$.avatar}
      userId={$.userId}
      userName={$.userName}
      userSign={$.userSign}
      html={$.html}
      commentsLoaded={!!_loaded}
      monoId={$.monoId}
      isMono={$.isMono}
    />
  )
})

const memoStyles = _.memoStyles(_ => ({
  groupWrap: {
    minHeight: 32 * _.ratio,
    marginTop: _.sm,
    marginBottom: _.xs
  },
  groupLabel: {
    overflow: 'hidden',
    maxWidth: '100%',
    padding: 4,
    paddingRight: 10,
    marginRight: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs
  },
  userWrap: {
    height: 42 * _.ratio
  },
  katakana: {
    marginTop: -12
  },
  loading: {
    height: 240 * _.ratio
  }
}))
