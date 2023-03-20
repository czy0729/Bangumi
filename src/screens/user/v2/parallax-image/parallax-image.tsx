/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-20 17:06:31
 */
import React, { useCallback, useMemo } from 'react'
import { Animated, View } from 'react-native'
import { Flex, Text, Iconfont, Heatmap } from '@components'
import { Popover, IconHeader, IconBack, Avatar } from '@_'
import { _ } from '@stores'
import { open, HTMLDecode, getBlurRadius } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IOS, TEXT_ONLY } from '@constants'
import { UserId, ViewStyle } from '@types'
import Head from '../head'
import { H_HEADER } from '../ds'
import { DATA_ME, DATA_OTHER, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

export default memo(
  ({
    navigation,
    themeStyles,
    parallaxImageHeight,
    avatar,
    bg,
    bgAvatar,
    fixed,
    id,
    myUserId,
    nickname,
    paramsUserId,
    scrollY,
    src,
    textType,
    userId,
    username
  }) => {
    global.rerender('User.ParallaxImage.Main')

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

          // -h: 2, 0: 1, h: 1 当scrollY在-h到0时, scale按照2-1的动画运动
          // 当scrollY在0-h时, scale不变. 可以输入任意数量对应的值, 但必须是递增或者相等
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

          case '我的netaba.re':
            open(`https://netaba.re/user/${id}`)
            break

          case 'TA的好友':
            navigation.push('Friends', {
              userId: id
            })
            break

          case 'TA的netaba.re':
            open(`https://netaba.re/user/${id}`)
            break

          default:
            break
        }
      },
      [navigation, userId, id]
    )

    const AnimatedView = useMemo(() => {
      global.rerender('User.ParallaxImage.AnimatedView')

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
              <Text
                style={_.ml.sm}
                type={textType}
                align='center'
                bold
                numberOfLines={1}
              >
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
              <Head style={themeStyles.head} />
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
      global.rerender('User.ParallaxImage.Content')

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
              name='md-timeline'
              color={_.__colorPlain__}
              size={21}
              onPress={() => {
                t('我的.跳转', {
                  to: 'UserTimeline'
                })

                const data: {
                  userId: UserId
                  userName?: string
                } = {
                  userId: username || id
                }
                if (paramsUserId) data.userName = nickname

                navigation.push('UserTimeline', data)
              }}
            />
            <Heatmap right={48} id='我的.跳转' to='UserTimeline' alias='时间线' />
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
  DEFAULT_PROPS
)
