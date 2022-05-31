/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: czy0729
 * @Date: 2019-05-08 17:13:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-31 11:27:10
 */
import React, { useMemo, useCallback } from 'react'
import { ScrollView, View, Alert } from 'react-native'
import { Flex, Katakana, Text, Iconfont, Touchable, Expand } from '@components'
import { _, timelineStore } from '@stores'
import { getTimestamp, appNavigate, findSubjectCn, getCoverMedium } from '@utils'
import { matchUserId } from '@utils/match'
import { t } from '@utils/fetch'
import { memo, ob } from '@utils/decorators'
import { HOST, HOST_NAME, EVENT, IMG_WIDTH_SM, IMG_HEIGHT_SM } from '@constants'
import { Avatar, Cover, Stars, Name, Popover } from '../base'

const avatarWidth = 40
const avatarCoverWidth = 40 * _.ratio
const hiddenDS = ['1天不看TA', '3天不看TA', '7天不看TA', '重置']
const defaultProps = {
  navigation: {},
  styles: {},
  style: {},
  avatar: {},
  userId: '',
  p1: {},
  p2: {},
  p3: {
    text: [],
    url: []
  },
  p4: {},
  image: [],
  comment: '',
  reply: {},
  time: '',
  star: '',
  subject: '',
  subjectId: 0,
  clearHref: '',
  event: EVENT,
  onDelete: Function.prototype,
  onHidden: Function.prototype
}

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
    rerender('Component.ItemTimeline.Main')

    const { src: avatarSrc } = avatar
    const { length: imageLength } = image
    const { count: replyCount, url: replyUrl, content: replyContent } = reply
    const { text: p1Text, url: p1Url } = p1
    const { text: p2Text } = p2
    const { text: p3Text, url: p3Url } = p3
    const { text: p4Text } = p4

    const onNavigate = useCallback(
      (url, passParams) => appNavigate(url, navigation, passParams, event),
      []
    )
    const onClear = useCallback(
      () =>
        Alert.alert('警告', '确定删除?', [
          {
            text: '取消',
            style: 'cancel'
          },
          {
            text: '确定',
            onPress: () => onDelete(clearHref)
          }
        ]),
      [clearHref]
    )

    // useMemo组件都不传依赖参数, 时间胶囊数据性质就是一次性, 没有更新需求
    const renderAvatar = useMemo(
      () => (
        <View style={styles.avatar}>
          {!!avatarSrc && (
            <Avatar
              navigation={navigation}
              size={avatarWidth}
              userId={userId}
              name={p1Text}
              src={avatarSrc}
              event={event}
            />
          )}
        </View>
      ),
      []
    )

    // 位置3: 多个条目信息
    const renderP3 = useMemo(() => {
      let $p3
      if (p3Text.length > 1) {
        $p3 = []
        p3Text.forEach((item, index) => {
          const url = String(p3Url[index])
          const isSubject =
            url.includes(`${HOST_NAME}/subject/`) && !url.includes('/ep/')
          const subjectId = isSubject ? matchSubjectId(url) : 0
          $p3.push(
            <Katakana
              key={item || index}
              type={isSubject ? 'main' : 'title'}
              lineHeight={16}
              bold
              onPress={() =>
                onNavigate(
                  url,
                  isSubject && {
                    _jp: item,
                    _cn: findSubjectCn(item, subjectId),
                    _name: item,
                    _image: getCoverMedium(image[index] || '')
                  }
                )
              }
            >
              {isSubject ? findSubjectCn(item, subjectId) : item}
            </Katakana>,
            <Text key={`${item}.`} lineHeight={16} type='sub'>
              、
            </Text>
          )
        })
        $p3.pop()
      } else if (p3Text.length === 1) {
        const isSubject =
          !!String(!!p3Url.length && p3Url[0]).includes(`${HOST_NAME}/subject/`) &&
          !p3Url[0].includes('/ep/')
        const subjectId = isSubject ? matchSubjectId(!!p3Url.length && p3Url[0]) : 0
        $p3 = (
          <Katakana
            type={isSubject ? 'main' : 'title'}
            lineHeight={16}
            bold
            onPress={() =>
              onNavigate(
                !!p3Url.length && p3Url[0],
                isSubject && {
                  _jp: !!p3Text.length && p3Text[0],
                  _cn: findSubjectCn(!!p3Text.length && p3Text[0], subjectId),
                  _name: !!p3Text.length && p3Text[0],
                  _image: getCoverMedium((!!imageLength && image[0]) || '')
                }
              )
            }
          >
            {isSubject
              ? findSubjectCn(!!p3Text.length && p3Text[0], subjectId)
              : !!p3Text.length && p3Text[0]}
          </Katakana>
        )
      }

      return $p3
    }, [])

    const renderP = useMemo(() => {
      // 是否渲染第一行
      const hasPosition = !!(p1Text || p2Text || p3Text.length || p4Text)
      if (!hasPosition) return null

      return (
        <Text lineHeight={16}>
          {!!p1Text && (
            <Name
              userId={userId}
              type='title'
              lineHeight={16}
              bold
              onPress={() =>
                onNavigate(p1Url, {
                  _name: p1Text,
                  _image: avatarSrc
                })
              }
            >
              {p1Text}{' '}
            </Name>
          )}
          <Text type='sub' lineHeight={16}>
            {p2Text}{' '}
          </Text>
          {renderP3}
          {!!p4Text && (
            <Text type='sub' lineHeight={16}>
              {' '}
              {p4Text}
            </Text>
          )}
        </Text>
      )
    }, [])

    const renderDesc = useMemo(() => {
      const { id, data = {} } = event
      return (
        <>
          {!!subject && (
            <View style={_.mt.sm}>
              <Katakana.Provider>
                <Katakana
                  type='main'
                  bold
                  onPress={() => {
                    t(id, {
                      to: 'Subject',
                      subjectId,
                      ...data
                    })

                    navigation.push('Subject', {
                      subjectId,
                      _cn: findSubjectCn(subject, subjectId),
                      _jp: subject,
                      _image: getCoverMedium(!!imageLength && image[0])
                    })
                  }}
                >
                  {findSubjectCn(subject, subjectId)}
                </Katakana>
              </Katakana.Provider>
            </View>
          )}
          {!!(comment || replyContent || replyCount) && (
            <View style={_.mt.sm}>
              <Expand moreStyle={styles.more} ratio={0.64}>
                <Text lineHeight={20}>{comment || replyContent || replyCount}</Text>
              </Expand>
            </View>
          )}
        </>
      )
    }, [])

    const renderImages = useCallback(type => {
      if (imageLength <= 1) return null

      const images = image.map((item, index) => {
        const isAvatar = !String(!!p3Url.length && p3Url[0]).includes('subject')
        return (
          <View key={item || index} style={type ? _.mr.md : _.mr.sm}>
            <Cover
              src={item}
              size={isAvatar ? avatarCoverWidth : IMG_WIDTH_SM}
              height={isAvatar ? avatarCoverWidth : IMG_HEIGHT_SM}
              radius
              shadow
              type={type}
              onPress={() => {
                const url = (!!p3Url.length && p3Url[index]) || ''
                const subjectId = matchSubjectId(url)
                onNavigate(url, {
                  _cn: findSubjectCn(!!p3Text.length && p3Text[index], subjectId),
                  _jp: !!p3Text.length && p3Text[index],
                  _name: !!p3Text.length && p3Text[index],
                  _image: item
                })
              }}
            />
          </View>
        )
      })

      if (imageLength <= 3) {
        return (
          <Flex style={_.mt.sm} wrap='wrap'>
            {images}
          </Flex>
        )
      }

      // 有一次性操作很多条目很多图片的情况, 水平滚动比较合适
      return (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.images}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          overScrollMode='never'
        >
          {images}
        </ScrollView>
      )
    }, [])

    const renderContent = useMemo(() => {
      const _image = !!imageLength && image[0]
      const bodyStyle =
        imageLength === 1 && !(comment || replyCount) ? _.mt.lg : _.mt.md
      const rightCoverIsAvatar = !String(!!p3Url.length && p3Url[0]).includes('subject')
      const showImages = imageLength >= 3
      const type = p2Text?.includes('读')
        ? '书籍'
        : p2Text?.includes('听')
        ? '音乐'
        : p2Text?.includes('玩')
        ? '游戏'
        : ''

      return (
        <Flex.Item style={[showImages ? styles.noPR : styles.content, _.ml.sm]}>
          <Flex align='start'>
            <Flex.Item>
              <View style={showImages && styles.hasPR}>
                {renderP}
                {renderDesc}
              </View>
              {renderImages(type)}
              <Flex style={bodyStyle}>
                {!!replyCount && (
                  <Text type='primary' size={12} onPress={() => onNavigate(replyUrl)}>
                    {replyCount}
                  </Text>
                )}
                <Text style={_.mr.sm} type='sub' size={12}>
                  {time}
                </Text>
                <Stars value={star} />
              </Flex>
            </Flex.Item>
            <Flex align='start'>
              {imageLength === 1 && (
                <View style={_.ml.md}>
                  <Cover
                    src={_image}
                    size={rightCoverIsAvatar ? avatarCoverWidth : IMG_WIDTH_SM}
                    height={rightCoverIsAvatar ? avatarCoverWidth : IMG_HEIGHT_SM}
                    radius
                    shadow
                    type={type}
                    onPress={() =>
                      onNavigate(!!p3Url.length && p3Url[0], {
                        _jp: !!p3Text.length && p3Text[0],
                        _name: !!p3Text.length && p3Text[0],
                        _image
                      })
                    }
                  />
                </View>
              )}
              {clearHref ? (
                <Touchable style={styles.touch} onPress={onClear}>
                  <Flex style={styles.extra} justify='center'>
                    <Iconfont name='md-close' size={18} />
                  </Flex>
                </Touchable>
              ) : (
                <Popover
                  style={styles.touch}
                  data={hiddenDS}
                  onSelect={title => onHidden(title, userId)}
                >
                  <Flex style={styles.extra} justify='center'>
                    <Iconfont name='md-more-vert' size={18} />
                  </Flex>
                </Popover>
              )}
            </Flex>
          </Flex>
        </Flex.Item>
      )
    }, [])

    return (
      <Flex
        style={[
          _.flat && styles.item,
          _.flat && !avatarSrc && styles.withoutAvatar,
          style
        ]}
        align='start'
      >
        {renderAvatar}
        {renderContent}
      </Flex>
    )
  },
  defaultProps,
  ({ styles }) => ({
    styles
  })
)

export const ItemTimeline = ob(
  ({
    navigation,
    style,
    avatar,
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
    rerender('Component.ItemTimeline')

    const userId = matchUserId(String(avatar?.url || p1?.url).replace(HOST, ''))
    if (userId in timelineStore.hidden) {
      if (getTimestamp() < timelineStore.hidden[userId]) return null
    }

    return (
      <Item
        navigation={navigation}
        styles={memoStyles()}
        style={style}
        avatar={avatar}
        userId={userId}
        p1={p1}
        p2={p2}
        p3={p3}
        p4={p4}
        image={image}
        comment={comment}
        reply={reply}
        time={time}
        star={star}
        subject={subject}
        subjectId={subjectId}
        clearHref={clearHref}
        event={event}
        onDelete={onDelete}
        onHidden={onHidden}
      />
    )
  }
)

const memoStyles = _.memoStyles(() => ({
  item: {
    ..._.container.item,
    paddingVertical: _.xs
  },
  withoutAvatar: {
    marginTop: -_.md
  },
  scrollView: {
    marginTop: _.sm,
    marginRight: -40
  },
  images: {
    paddingTop: _.sm,
    paddingRight: _.sm,
    paddingBottom: _.md
  },
  avatar: {
    width: avatarWidth * _.ratio,
    marginTop: 18,
    marginLeft: _.wind
  },
  content: {
    paddingTop: _.md,
    paddingRight: _.wind - _._wind,
    paddingBottom: _.md
  },
  noPR: {
    paddingVertical: _.md,
    paddingRight: _.wind - _._wind
  },
  hasPR: {
    paddingRight: _._wind
  },
  touch: {
    marginTop: -7,
    marginHorizontal: _.xs,
    borderRadius: 20,
    overflow: 'hidden'
  },
  extra: {
    width: 36,
    height: 36
  },
  more: {
    paddingHorizontal: 0
  }
}))

function matchSubjectId(url = '') {
  if (typeof url !== 'string') {
    return 0
  }

  const match = url.match(/\d+/)
  if (match && match.length) {
    return match[0]
  }
  return 0
}
