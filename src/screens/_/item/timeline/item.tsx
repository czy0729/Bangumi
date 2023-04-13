/*
 * @Author: czy0729
 * @Date: 2019-05-08 17:13:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 21:56:28
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Flex, Text, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { appNavigate, confirm, stl } from '@utils'
import { memo } from '@utils/decorators'
import { IMG_HEIGHT_SM, IMG_WIDTH_SM, SHARE_MODE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Cover, Stars, Popover } from '../../base'
import Avatar from './avatar'
import { DEFAULT_PROPS, AVATAR_COVER_WIDTH, HIDDEN_DS } from './ds'
import P from './p'
import Desc from './desc'
import Images from './images'

const Item = memo(
  ({
    navigation,
    styles,
    style,
    avatar,
    userId,
    p1,
    p2,
    p3,
    p4,
    image,
    comment,
    reply,
    time,
    star,
    subject,
    subjectId,
    clearHref,
    event,
    onDelete,
    onHidden
  }) => {
    // global.rerender('Component.ItemTimeline.Main')

    const { src: avatarSrc } = avatar
    const { count: replyCount, url: replyUrl, content: replyContent } = reply
    const { text: p1Text, url: p1Url } = p1
    const { text: p2Text } = p2
    const { text: p3Text, url: p3Url } = p3
    const { text: p4Text } = p4

    const _image = !!image.length && image[0]
    const rightCoverIsAvatar = !String(!!p3Url.length && p3Url[0]).includes('subject')
    const showImages = image.length >= 3

    const onNavigate = useCallback(
      (url, passParams?) => appNavigate(url, navigation, passParams, event),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    )
    const onClear = useCallback(() => {
      confirm('确定删除?', () => onDelete(clearHref))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clearHref])

    let type: SubjectTypeCn
    if (p2Text?.includes('读') || p4Text?.includes('书籍')) {
      type = '书籍'
    } else if (p2Text?.includes('听') || p4Text?.includes('音乐')) {
      type = '音乐'
    } else if (p2Text?.includes('玩') || p4Text?.includes('游戏')) {
      type = '游戏'
    }

    return (
      <Flex style={style} align='start'>
        <Avatar
          navigation={navigation}
          p1Text={p1Text}
          userId={userId}
          avatarSrc={avatarSrc}
          event={event}
        />
        <Flex.Item style={stl(showImages ? styles.noPR : styles.content, _.ml.sm)}>
          <Flex align='start'>
            <Flex.Item>
              <View style={showImages && styles.hasPR}>
                <P
                  image={image}
                  p1Text={p1Text}
                  p1Url={p1Url}
                  p2Text={p2Text}
                  p3Text={p3Text}
                  p3Url={p3Url}
                  p4Text={p4Text}
                  userId={userId}
                  avatarSrc={avatarSrc}
                  onNavigate={onNavigate}
                />
                <Desc
                  navigation={navigation}
                  subject={subject}
                  subjectId={subjectId}
                  image={image}
                  comment={comment}
                  replyContent={replyContent}
                  replyCount={replyCount}
                  event
                />
              </View>
              <Images
                type={type}
                image={image}
                p3Text={p3Text}
                p3Url={p3Url}
                onNavigate={onNavigate}
              />
              <Flex
                style={
                  image.length === 1 && !(comment || replyCount) ? _.mt.lg : _.mt.md
                }
              >
                {!!replyCount && (
                  <Touchable animate scale={0.9} onPress={() => onNavigate(replyUrl)}>
                    <Text type='primary' size={12}>
                      {replyCount}
                    </Text>
                  </Touchable>
                )}
                <Text style={_.mr.sm} type='sub' size={12}>
                  {time}
                </Text>
                <Stars value={star} />
              </Flex>
            </Flex.Item>
            <Flex align='start'>
              {image.length === 1 && (
                <Touchable
                  style={_.ml.md}
                  animate
                  onPress={() => {
                    onNavigate(!!p3Url.length && p3Url[0], {
                      _jp: !!p3Text.length && p3Text[0],
                      _name: !!p3Text.length && p3Text[0],
                      _image,
                      _type: type
                    })
                  }}
                >
                  <Cover
                    src={_image}
                    size={rightCoverIsAvatar ? AVATAR_COVER_WIDTH : IMG_WIDTH_SM}
                    height={rightCoverIsAvatar ? AVATAR_COVER_WIDTH : IMG_HEIGHT_SM}
                    radius
                    shadow
                    type={type}
                  />
                </Touchable>
              )}
              {!SHARE_MODE &&
                (clearHref ? (
                  <Touchable style={styles.touch} onPress={onClear}>
                    <Flex style={styles.extra} justify='center'>
                      <Iconfont name='md-close' size={18} />
                    </Flex>
                  </Touchable>
                ) : (
                  <Popover
                    style={styles.touch}
                    data={HIDDEN_DS}
                    onSelect={title => onHidden(title, userId)}
                  >
                    <Flex style={styles.extra} justify='center'>
                      <Iconfont name='md-more-vert' size={18} />
                    </Flex>
                  </Popover>
                ))}
            </Flex>
          </Flex>
        </Flex.Item>
      </Flex>
    )
  },
  DEFAULT_PROPS,
  ({ style, styles }) => ({
    style,
    styles
  })
)

export default Item
