/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 20:44:20
 */
import React, { useCallback, useMemo } from 'react'
import { Animated, View } from 'react-native'
import { Flex, Heatmap, Iconfont, Text } from '@components'
import { Avatar, IconBack, IconHeader, Popover } from '@_'
import { _ } from '@stores'
import { getBlurRadius, HTMLDecode, open } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST_NETABA, IOS, TEXT_ONLY } from '@constants'
import { UserId, ViewStyle } from '@types'
import HeaderComponent from '../../component/header-component'
import { H_HEADER } from '../../ds'
import { COMPONENT_MAIN, DATA_ME, DATA_OTHER, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

export default memo(
  ({
    navigation,
    themeStyles,
    parallaxImageHeight = 0,
    avatar = {},
    bg = '',
    bgAvatar = '',
    fixed = false,
    id = '',
    myUserId = '',
    nickname = '',
    paramsUserId = '',
    scrollY = new Animated.Value(0),
    src = '',
    textType = 'plain',
    userId = '',
    username = ''
  }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const parallaxStyle: {
      transform: any[]
    } = {
      transform: [
        {
          translateY: scrollY.interpolate({
            inputRange: [
              -parallaxImageHeight,
              0,
              parallaxImageHeight - H_HEADER,
              parallaxImageHeight
            ],
            outputRange: [
              parallaxImageHeight / 2,
              0,
              -(parallaxImageHeight - H_HEADER),
              -(parallaxImageHeight - H_HEADER)
            ]
          })
        }
      ]
    }

    // 安卓没有弹簧效果不需要形变
    if (IOS) {
      parallaxStyle.transform.push({
        scale: scrollY.interpolate({
          inputRange: [-parallaxImageHeight, 0, parallaxImageHeight],

          // -h: 2, 0: 1, h: 1 当 scrollY 在 -h 到 0 时, scale 按照 2-1 的动画运动
          // 当 scrollY 在 0-h 时, scale 不变. 可以输入任意数量对应的值, 但必须是递增或者相等
          outputRange: [2, 1, 1]
        })
      })
    }

    const onSelect = useCallback(
      key => {
        t('我的.右上角菜单', {
          key
        })

        switch (key) {
          case '我的空间':
            navigation.push('Zone', {
              userId
            })
            break

          case '我的好友':
            navigation.push('Friends')
            break

          case '我的人物':
            navigation.push('Character')
            break

          case '我的目录':
            navigation.push('Catalogs')
            break

          case '我的日志':
            navigation.push('Blogs')
            break

          case '我的词云':
            navigation.push('WordCloud', {
              userId: username || userId
            })
            break

          case '我的时间线':
            navigation.push('UserTimeline', {
              userId: username || userId
            })
            break

          case '我的netaba.re':
            open(`${HOST_NETABA}/user/${id}`)
            break

          case 'TA的好友':
            navigation.push('Friends', {
              userId: id
            })
            break

          case 'TA的netaba.re':
            open(`${HOST_NETABA}/user/${id}`)
            break

          default:
            break
        }
      },
      [navigation, userId, username, id]
    )

    const AnimatedView = useMemo(() => {
      let uri = bg || bgAvatar || avatar.large
      if (typeof uri === 'string') uri = uri.replace('http://', 'https://')

      return (
        <>
          {TEXT_ONLY ? (
            <Animated.View style={[themeStyles.parallaxImage, parallaxStyle]} />
          ) : (
            <Animated.Image
              style={[themeStyles.parallaxImage, parallaxStyle]}
              source={{
                uri
              }}
              blurRadius={getBlurRadius(uri, bg, avatar?.large)}
            />
          )}
          <Animated.View
            style={[
              styles.parallaxWrap,
              styles.parallaxMask,
              parallaxStyle as ViewStyle,
              {
                opacity: scrollY.interpolate({
                  inputRange: [
                    -parallaxImageHeight,
                    0,
                    parallaxImageHeight - H_HEADER,
                    parallaxImageHeight
                  ],
                  outputRange: _.select([0, 0.4, 1, 1], [0.4, 0.8, 1, 1])
                })
              }
            ]}
          />
          <Animated.View
            style={[
              styles.parallaxMask,
              parallaxStyle as ViewStyle,
              {
                opacity: scrollY.interpolate({
                  inputRange: [
                    -parallaxImageHeight,
                    0,
                    parallaxImageHeight - H_HEADER,
                    parallaxImageHeight
                  ],
                  outputRange: [0, 0, 1, 1]
                })
              }
            ]}
          >
            <Flex style={styles.title} justify='center'>
              <Avatar
                style={styles.avatar}
                size={28}
                src={src}
                borderWidth={0}
                fallbackSrc={avatar.large}
              />
              <Text style={_.ml.sm} type={textType} align='center' bold shadow numberOfLines={1}>
                {HTMLDecode(nickname)}
              </Text>
            </Flex>
          </Animated.View>
          <Animated.View style={[styles.parallaxWrap, parallaxStyle as ViewStyle]}>
            <Animated.View
              style={{
                opacity: scrollY.interpolate({
                  inputRange: [
                    -parallaxImageHeight,
                    0,
                    parallaxImageHeight - H_HEADER,
                    parallaxImageHeight
                  ],
                  outputRange: [1, 1, 0, 0]
                })
              }}
            >
              <HeaderComponent style={themeStyles.head} />
            </Animated.View>
            <View style={themeStyles.parallaxLine} />
          </Animated.View>
        </>
      )
    }, [
      avatar.large,
      bg,
      bgAvatar,
      nickname,
      parallaxImageHeight,
      parallaxStyle,
      scrollY,
      src,
      textType,
      themeStyles
    ])

    const Content = useMemo(() => {
      const isMe = !!id && myUserId === id
      const data = isMe ? DATA_ME : DATA_OTHER
      return (
        <>
          {!!paramsUserId && (
            <View style={styles.back}>
              <IconBack navigation={navigation} color={_.__colorPlain__} />
            </View>
          )}
          <View style={paramsUserId ? styles.more : isMe ? styles.menu : styles.more}>
            <Popover style={styles.touch} data={data} onSelect={onSelect}>
              <Flex style={styles.icon} justify='center'>
                <Iconfont name='md-menu' color={_.__colorPlain__} />
              </Flex>
              <Heatmap right={-40} id='我的.右上角菜单' />
            </Popover>
          </View>
          <View style={styles.timeline}>
            <IconHeader
              name='md-image-aspect-ratio'
              color={_.__colorPlain__}
              size={21}
              onPress={() => {
                t('我的.跳转', {
                  to: 'Milestone'
                })

                const data: {
                  userId: UserId
                  userName?: string
                } = {
                  userId: username || id
                }
                if (paramsUserId) data.userName = nickname

                navigation.push('Milestone', data)
              }}
            />
          </View>
          {!paramsUserId && (
            <View style={styles.setting}>
              <IconHeader
                name='setting'
                color={_.__colorPlain__}
                onPress={() => {
                  t('我的.跳转', {
                    to: 'Setting'
                  })

                  navigation.push('Setting')
                }}
              />
              <Heatmap id='我的.跳转' to='Setting' alias='设置' />
            </View>
          )}
        </>
      )
    }, [id, myUserId, navigation, nickname, onSelect, paramsUserId, username])

    return (
      <>
        <View style={styles.parallax} pointerEvents={fixed ? 'none' : undefined}>
          {AnimatedView}
        </View>
        {Content}
      </>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)
