/*
 * @Author: czy0729
 * @Date: 2019-05-01 20:14:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-12 05:25:55
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import {
  Avatar,
  Cover,
  Divider,
  Expand,
  Flex,
  HeaderPlaceholder,
  Heatmap,
  Text,
  Touchable,
  UserStatus
} from '@components'
import { Name, UserAge } from '@_'
import { _, systemStore } from '@stores'
import { appNavigate, findSubjectCn, HTMLDecode, simpleTime } from '@utils'
import { memo } from '@utils/decorators'
import { HOST, IMG_EMPTY, IMG_EMPTY_DARK } from '@constants'
import Content from '../content'
import Ep from '../ep'
import Milestone from '../milestone'
import SectionTitle from '../section-title'
import WordCloud from '../word-cloud'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Top = memo(
  ({
    navigation,
    styles,
    topicId,
    title,
    subTitle,
    time,
    replies,
    group,
    groupHref,
    groupThumb,
    groupThumbFallback,
    avatar,
    userId,
    userName,
    userSign,
    filterPost,
    monoId,
    isMono,
    delete: topicDelete
  }) => {
    const [lines, setLines] = useState(1)
    const setLines2 = useCallback(() => setLines(2), [])

    const event = {
      id: '帖子.跳转',
      data: {
        from: '#1',
        topicId
      }
    } as const

    const isGroup = topicId.includes('group/')
    const isEp = topicId.includes('ep/')
    return (
      <>
        <HeaderPlaceholder />
        <View style={styles.container}>
          <Milestone />
          <Text type='title' size={20} bold selectable>
            {title}
            {!!replies && (
              <Text type='main' size={12} lineHeight={26} bold>
                {`  ${replies.includes('+') ? '' : '+'}${replies.trim()}`}
              </Text>
            )}
          </Text>
          {!!subTitle && (
            <Text style={_.mv.sm} type='sub' size={14} bold selectable>
              {subTitle}
            </Text>
          )}
          <Flex style={styles.groupWrap}>
            {!!group && (
              <Flex style={styles.groupLabel}>
                <Touchable
                  animate
                  onPress={() => {
                    if (isMono) {
                      appNavigate(`${HOST}/${monoId}`, navigation, {}, event)
                      return
                    }

                    appNavigate(
                      groupHref,
                      navigation,
                      {
                        _jp: group
                      },
                      event
                    )
                  }}
                >
                  <Flex>
                    <Cover
                      size={isEp ? 40 : 20}
                      src={groupThumb || _.select(IMG_EMPTY, IMG_EMPTY_DARK)}
                      radius={_.radiusXs}
                      priority='high'
                      fallback={isEp}
                      fallbackSrc={
                        isEp ? String(groupThumbFallback).replace('/r/100x100', '') : undefined
                      }
                    />
                    <Text style={styles.group} size={13} numberOfLines={1}>
                      {HTMLDecode(findSubjectCn(group))}
                    </Text>
                  </Flex>
                </Touchable>
              </Flex>
            )}
            <Flex.Item>
              {!!time && (
                <Text type='sub' size={13}>
                  {simpleTime(time)}
                </Text>
              )}
            </Flex.Item>
            <WordCloud />
            <Heatmap right={74} id='帖子.跳转' to='Group' alias='小组' />
            <Heatmap id='帖子.跳转' to='Subject' alias='条目' transparent />
          </Flex>
          {isGroup && (
            <Flex style={styles.userWrap}>
              {!!avatar && (
                <UserStatus userId={userId}>
                  <Avatar
                    navigation={navigation}
                    event={event}
                    size={40}
                    src={avatar}
                    userId={userId}
                    name={userName}
                    priority='high'
                  />
                </UserStatus>
              )}
              {!!userId && (
                <Flex.Item style={_.ml.sm}>
                  <Flex>
                    <Name userId={userId} numberOfLines={1} bold>
                      {userName}
                    </Name>
                    {systemStore.setting.userAge && <UserAge value={userId} avatar={avatar} />}
                  </Flex>
                  <Text
                    style={_.mt.xs}
                    type='sub'
                    size={12}
                    numberOfLines={lines}
                    onPress={setLines2}
                  >
                    @{userId}
                    {!!userSign && ` (${userSign.slice(1, userSign.length - 1)})`}
                  </Text>
                </Flex.Item>
              )}
              <Heatmap id='帖子.跳转' to='Zone' alias='空间' />
            </Flex>
          )}
          {filterPost ? (
            <Expand ratio={1.28}>
              <Content />
            </Expand>
          ) : (
            <Content />
          )}
          {!!topicDelete && (
            <Text style={_.mb.md} size={15} lineHeight={18} bold align='center'>
              数据库中没有查询到指定话题{'\n'}话题可能正在审核或已被删除
            </Text>
          )}
        </View>
        <Divider />
        <Ep />
        <SectionTitle />
      </>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Top
