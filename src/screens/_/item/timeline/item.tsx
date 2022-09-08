/*
 * @Author: czy0729
 * @Date: 2019-05-08 17:13:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-08 15:43:57
 */
import React, { useMemo, useCallback } from 'react'
import { ScrollView, View } from 'react-native'
import {
  Flex,
  Katakana,
  Text,
  Iconfont,
  Touchable,
  Expand,
  UserStatus
} from '@components'
import { _, uiStore, systemStore } from '@stores'
import { appNavigate, findSubjectCn, getCoverMedium, confirm } from '@utils'
import { t } from '@utils/fetch'
import { memo } from '@utils/decorators'
import {
  HOST_NAME,
  IMG_HEIGHT_SM,
  IMG_WIDTH_SM,
  SCROLL_VIEW_RESET_PROPS
} from '@constants'
import { Avatar, Cover, Stars, Name, Popover } from '../../base'
import { matchSubjectId } from './utils'
import { DEFAULT_PROPS, AVATAR_WIDTH, AVATAR_COVER_WIDTH, HIDDEN_DS } from './ds'

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
    global.rerender('Component.ItemTimeline.Main')

    const { src: avatarSrc } = avatar
    const { length: imageLength } = image
    const { count: replyCount, url: replyUrl, content: replyContent } = reply
    const { text: p1Text, url: p1Url } = p1
    const { text: p2Text } = p2
    const { text: p3Text, url: p3Url } = p3
    const { text: p4Text } = p4

    const onNavigate = useCallback(
      (url, passParams?) => appNavigate(url, navigation, passParams, event),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    )
    const onClear = useCallback(() => {
      confirm('确定删除?', () => onDelete(clearHref))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clearHref])

    // useMemo组件都不传依赖参数, 时间胶囊数据性质就是一次性, 没有更新需求
    const renderAvatar = useMemo(
      () => (
        <View style={styles.avatar}>
          {!!avatarSrc && (
            <UserStatus userId={userId}>
              <Avatar
                navigation={navigation}
                size={AVATAR_WIDTH}
                userId={userId}
                name={p1Text}
                src={avatarSrc}
                event={event}
              />
            </UserStatus>
          )}
        </View>
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    )

    // 位置3: 多个条目信息
    const renderP3 = useMemo(() => {
      let $p3: any | any[]
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
              onPress={() => {
                if (isSubject && subjectId && systemStore.setting.timelinePopable) {
                  t('时间胶囊.缩略框', {
                    to: 'Subject',
                    subjectId
                  })
                  uiStore.showPopableSubject({
                    subjectId
                  })
                  return
                }

                onNavigate(
                  url,
                  isSubject && {
                    _jp: item,
                    _cn: findSubjectCn(item, subjectId),
                    _name: item,
                    _image: getCoverMedium(image[index] || '')
                  }
                )
              }}
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
            onPress={() => {
              if (isSubject && subjectId && systemStore.setting.timelinePopable) {
                t('时间胶囊.缩略框', {
                  to: 'Subject',
                  subjectId
                })
                uiStore.showPopableSubject({
                  subjectId
                })
                return
              }

              onNavigate(
                !!p3Url.length && p3Url[0],
                isSubject && {
                  _jp: !!p3Text.length && p3Text[0],
                  _cn: findSubjectCn(!!p3Text.length && p3Text[0], subjectId),
                  _name: !!p3Text.length && p3Text[0],
                  _image: getCoverMedium((!!imageLength && image[0]) || '')
                }
              )
            }}
          >
            {isSubject
              ? findSubjectCn(!!p3Text.length && p3Text[0], subjectId)
              : !!p3Text.length && p3Text[0]}
          </Katakana>
        )
      }

      return $p3
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderP = useMemo(() => {
      // 是否渲染第一行
      const hasPosition = !!(p1Text || p2Text || p3Text.length || p4Text)
      if (!hasPosition) return null

      return (
        <Katakana.Provider lineHeight={16}>
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
            <Katakana type='sub' lineHeight={16}>
              {' '}
              {p4Text}
            </Katakana>
          )}
        </Katakana.Provider>
      )

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderDesc = useMemo(() => {
      const { id, data = {} } = event
      return (
        <>
          {!!subject && (
            <View style={_.mt.sm}>
              {/* 1行: 单个条目 */}
              <Katakana.Provider>
                <Katakana
                  type='main'
                  bold
                  onPress={() => {
                    const eventData = {
                      to: 'Subject',
                      subjectId,
                      ...data
                    }
                    if (subjectId && systemStore.setting.timelinePopable) {
                      t('时间胶囊.缩略框', eventData)
                      uiStore.showPopableSubject({
                        subjectId
                      })
                      return
                    }

                    t(id, eventData)
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderImages = useCallback(type => {
      if (imageLength <= 1) return null

      const images = image.map((item, index) => {
        const isAvatar = !String(!!p3Url.length && p3Url[0]).includes('subject')
        return (
          <View key={item || index} style={type ? _.mr.md : _.mr.sm}>
            <Cover
              src={item}
              size={isAvatar ? AVATAR_COVER_WIDTH : IMG_WIDTH_SM}
              height={isAvatar ? AVATAR_COVER_WIDTH : IMG_HEIGHT_SM}
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
                  _image: item,
                  _type: type
                })
              }}
            />
          </View>
        )
      })

      if (imageLength <= 3) {
        return <Flex style={_.mt.sm}>{images}</Flex>
      }

      // 有一次性操作很多条目很多图片的情况, 水平滚动比较合适
      return (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.images}
          horizontal
          {...SCROLL_VIEW_RESET_PROPS}
        >
          {images}
        </ScrollView>
      )
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderContent = useMemo(() => {
      const _image = !!imageLength && image[0]
      const bodyStyle =
        imageLength === 1 && !(comment || replyCount) ? _.mt.lg : _.mt.md
      const rightCoverIsAvatar = !String(!!p3Url.length && p3Url[0]).includes('subject')
      const showImages = imageLength >= 3

      let type
      if (p2Text?.includes('读') || p4Text?.includes('书籍')) {
        type = '书籍'
      } else if (p2Text?.includes('听') || p4Text?.includes('音乐')) {
        type = '音乐'
      } else if (p2Text?.includes('玩') || p4Text?.includes('游戏')) {
        type = '游戏'
      }

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
              {/* {imageLength === 0 && !!subjectId && (
                <View style={_.ml.md}>
                  <Cover
                    src={API_COVER(subjectId)}
                    size={IMG_WIDTH_SM / 2}
                    height={IMG_HEIGHT_SM / 2}
                    radius
                    shadow
                    headers={userStore.requestHeaders}
                    onPress={() => {
                      navigation.push('Subject', {
                        subjectId
                      })
                    }}
                  />
                </View>
              )} */}
              {imageLength === 1 && (
                <View style={_.ml.md}>
                  <Cover
                    src={_image}
                    size={rightCoverIsAvatar ? AVATAR_COVER_WIDTH : IMG_WIDTH_SM}
                    height={rightCoverIsAvatar ? AVATAR_COVER_WIDTH : IMG_HEIGHT_SM}
                    radius
                    shadow
                    type={type}
                    onPress={() =>
                      onNavigate(!!p3Url.length && p3Url[0], {
                        _jp: !!p3Text.length && p3Text[0],
                        _name: !!p3Text.length && p3Text[0],
                        _image,
                        _type: type
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
                  data={HIDDEN_DS}
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <Flex style={style} align='start'>
        {renderAvatar}
        {renderContent}
      </Flex>
    )
  },
  DEFAULT_PROPS,
  ({ styles }) => ({
    styles
  })
)

export default Item
