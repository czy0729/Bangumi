/*
 * @Author: czy0729
 * @Date: 2019-05-08 17:13:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 05:12:42
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Cover, Flex, Iconfont, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { _, uiStore, userStore } from '@stores'
import { appNavigate, confirm, stl, x18 } from '@utils'
import { memo } from '@utils/decorators'
import { EVENT, FROZEN_ARRAY, FROZEN_FN, IMG_HEIGHT_SM, IMG_WIDTH_SM, SHARE_MODE } from '@constants'
import { SubjectTypeCn } from '@types'
import { InView, Likes, Popover, Stars } from '../../base'
import Avatar from './avatar'
import Desc from './desc'
import Images from './images'
import P from './p'
import {
  AVATAR_COVER_WIDTH,
  COMPONENT_MAIN,
  DEFAULT_PROPS,
  HIDDEN_DS,
  ITEM_HEIGHT,
  LIKES_OFFSETS
} from './ds'

const Item = memo(
  ({
    navigation,
    styles,
    style,
    full = false,
    avatar = {
      src: ''
    },
    userId = '',
    p1 = {
      text: '',
      url: ''
    },
    p2 = {
      text: ''
    },
    p3 = {
      text: [],
      url: []
    },
    p4 = {
      text: ''
    },
    image = FROZEN_ARRAY,
    comment = '',
    reply = {
      count: '',
      url: '',
      content: ''
    },
    like = {
      mainId: '',
      relatedId: '',
      type: ''
    },
    time = '',
    star = '',
    subject = '',
    subjectId = 0,
    clearHref = '',
    index = 0,
    event = EVENT,
    onDelete = FROZEN_FN,
    onHidden = FROZEN_FN
  }) => {
    const { src: avatarSrc } = avatar
    const { count: replyCount, url: replyUrl, content: replyContent } = reply
    const { text: p1Text, url: p1Url } = p1
    const { text: p2Text } = p2
    const { text: p3Text, url: p3Url } = p3
    const { text: p4Text } = p4

    const _image = !!image.length && image[0]
    const rightCoverIsAvatar = !String(!!p3Url.length && p3Url[0]).includes('subject')
    const showImages = image.length >= 3

    const handleNavigate = useCallback(
      (url: string, passParams?: object) => {
        appNavigate(url, navigation, passParams, event)
      },
      [event, navigation]
    )
    const handleSelect = useCallback(
      (title: string) => {
        onHidden(title, userId)
      },
      [onHidden, userId]
    )
    const handleClear = useCallback(() => {
      confirm('确定删除?', () => {
        onDelete(clearHref)
      })
    }, [clearHref, onDelete])

    let type: SubjectTypeCn
    if (p2Text?.includes('读') || p4Text?.includes('书籍')) {
      type = '书籍'
    } else if (p2Text?.includes('听') || p4Text?.includes('音乐')) {
      type = '音乐'
    } else if (p2Text?.includes('玩') || p4Text?.includes('游戏')) {
      type = '游戏'
    }

    const y = ITEM_HEIGHT * (index + 2)
    return (
      <Flex style={style} align='start'>
        {full ? (
          <View style={_.mr.md} />
        ) : (
          <InView key={index} style={styles.inView} y={y}>
            <Avatar
              navigation={navigation}
              p1Text={p1Text}
              userId={userId}
              avatarSrc={avatarSrc}
              event={event}
            />
          </InView>
        )}
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
                  onNavigate={handleNavigate}
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
              <InView key={index} y={y}>
                <Images
                  type={type}
                  image={image}
                  p3Text={p3Text}
                  p3Url={p3Url}
                  onNavigate={handleNavigate}
                />
              </InView>
              <Likes
                show
                topicId={like.mainId}
                id={like.relatedId}
                likeType={like.type}
                formhash={userStore.formhash}
                offsets={LIKES_OFFSETS}
                onLongPress={uiStore.showLikesUsers}
              />
              <Flex style={image.length === 1 && !(comment || replyCount) ? _.mt.lg : _.mt.md}>
                {!!replyCount && (
                  <>
                    <Touchable animate scale={0.9} onPress={() => handleNavigate(replyUrl)}>
                      <Text type='primary' size={12}>
                        {replyCount}
                      </Text>
                    </Touchable>
                    <Text type='sub' size={12} numberOfLines={1}>
                      {' · '}
                    </Text>
                  </>
                )}
                <Text style={_.mr.sm} type='sub' size={12} numberOfLines={1}>
                  {time}
                </Text>
                <Stars value={star} />
              </Flex>
            </Flex.Item>
            <Flex align='start'>
              {image.length === 1 && (
                <InView key={index} y={y}>
                  <Touchable
                    style={styles.cover}
                    animate
                    onPress={() => {
                      handleNavigate(!!p3Url.length && p3Url[0], {
                        _jp: !!p3Text.length && p3Text[0],
                        _name: !!p3Text.length && p3Text[0],
                        _image: rightCoverIsAvatar ? _image : getCoverSrc(_image, IMG_WIDTH_SM),
                        _type: type
                      })
                    }}
                  >
                    <Cover
                      src={_image}
                      size={rightCoverIsAvatar ? AVATAR_COVER_WIDTH : IMG_WIDTH_SM}
                      height={rightCoverIsAvatar ? AVATAR_COVER_WIDTH : IMG_HEIGHT_SM}
                      radius
                      type={type}
                      cdn={!x18(subjectId)}
                    />
                  </Touchable>
                </InView>
              )}
              <View style={styles.menu}>
                {!SHARE_MODE &&
                  (clearHref ? (
                    <Touchable style={styles.touch} onPress={handleClear}>
                      <Flex style={styles.extra} justify='center'>
                        <Iconfont name='md-close' size={18} />
                      </Flex>
                    </Touchable>
                  ) : (
                    <Popover style={styles.touch} data={HIDDEN_DS} onSelect={handleSelect}>
                      <Flex style={styles.extra} justify='center'>
                        <Iconfont name='md-more-vert' size={18} />
                      </Flex>
                    </Popover>
                  ))}
              </View>
            </Flex>
          </Flex>
        </Flex.Item>
      </Flex>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN,
  props => ({
    style: props.style,
    styles: props.styles,

    /** 时间胶囊项的信息变化不重要, 只根据时间判断 */
    time: props.time
  })
)

export default Item
