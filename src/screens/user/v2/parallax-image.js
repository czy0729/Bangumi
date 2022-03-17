/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 01:38:05
 */
import React, { useCallback, useMemo } from 'react'
import { Animated, View } from 'react-native'
import { Flex, Text, Iconfont, Heatmap } from '@components'
import { Popover, IconHeader, IconBack, Avatar } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { HTMLDecode } from '@utils/html'
import { memo, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IOS } from '@constants'
import Head from './head'
import { H_HEADER, H_RADIUS_LINE } from './store'

const dataMe = [
  '我的空间',
  '我的好友',
  '我的人物',
  '我的目录',
  '我的日志',
  '我的netaba.re'
]
const dataOther = ['TA的好友', 'TA的netaba.re']
const defaultProps = {
  navigation: {},
  themeStyles: {},
  parallaxImageHeight: 0,
  avatar: {},
  bg: '',
  fixed: false,
  id: '',
  myUserId: '',
  nickname: '',
  paramsUserId: '',
  scrollY: 0,
  src: '',
  textType: 'plain',
  userId: '',
  username: ''
}

const ParallaxImage = memo(
  ({
    navigation,
    themeStyles,
    parallaxImageHeight,
    avatar,
    bg,
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
    rerender('User.ParallaxImage.Main')

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const parallaxStyle = {
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
      rerender('User.ParallaxImage.AnimatedView')

      let uri = bg || avatar.large
      if (typeof uri === 'string') uri = uri.replace('http://', 'https://')
      const blurRadius = (IOS ? 2 : 1) - (bg ? 1 : 0)
      return (
        <>
          <Animated.Image
            style={[themeStyles.parallaxImage, parallaxStyle]}
            source={{
              uri
            }}
            blurRadius={blurRadius}
          />
          <Animated.View
            style={[
              styles.parallaxWrap,
              styles.parallaxMask,
              parallaxStyle,
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
              parallaxStyle,
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
              <Avatar size={28} src={src} />
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
          <Animated.View style={[styles.parallaxWrap, parallaxStyle]}>
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
      nickname,
      parallaxImageHeight,
      parallaxStyle,
      scrollY,
      src,
      textType,
      themeStyles.head,
      themeStyles.parallaxImage,
      themeStyles.parallaxLine
    ])

    const Content = useMemo(() => {
      rerender('User.ParallaxImage.Content')

      const isMe = !!id && myUserId === id
      const data = isMe ? dataMe : dataOther
      return (
        <>
          {!!paramsUserId && (
            <View style={styles.back}>
              <IconBack navigation={navigation} color={_.__colorPlain__} />
            </View>
          )}
          <View style={[isMe ? styles.menu : styles.more]}>
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
              onPress={() => {
                t('我的.跳转', {
                  to: 'UserTimeline'
                })

                const data = {
                  userId: username || id
                }
                if (paramsUserId) data.userName = nickname

                navigation.push('UserTimeline', data)
              }}
            />
            <Heatmap
              right={48}
              id='我的.跳转'
              data={{
                to: 'UserTimeline',
                alias: '时间线'
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
              <Heatmap
                id='我的.跳转'
                data={{
                  to: 'Setting',
                  alias: '设置'
                }}
              />
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
  defaultProps
)

export default obc(({ scrollY, fixed }, { $, navigation }) => {
  rerender('User.ParallaxImage')

  const { id, avatar = {}, nickname, username } = $.usersInfo
  return (
    <ParallaxImage
      navigation={navigation}
      themeStyles={memoStyles()}
      parallaxImageHeight={_.parallaxImageHeight}
      avatar={avatar}
      bg={$.bg}
      fixed={fixed}
      id={id}
      myUserId={$.myUserId}
      nickname={nickname}
      paramsUserId={$.params.userId}
      scrollY={scrollY}
      src={$.avatar || avatar.large}
      textType={_.select('plain', 'title')}
      userId={$.userId}
      username={username}
    />
  )
})

const memoStyles = _.memoStyles(() => ({
  parallaxLine: {
    position: 'absolute',
    right: 0,
    bottom: -1,
    left: 0,
    height: H_RADIUS_LINE,
    backgroundColor: _.select(
      _.colorPlain,
      _.deepDark ? _._colorPlain : _._colorDarkModeLevel1
    ),
    borderTopLeftRadius: H_RADIUS_LINE,
    borderTopRightRadius: H_RADIUS_LINE,
    overflow: 'hidden'
  },
  parallaxImage: {
    marginTop: -8,
    height: _.parallaxImageHeight + 8
  },
  head: {
    marginTop: _.device((_.parallaxImageHeight - 120) / 2, 80)
  }
}))

const styles = _.create({
  parallax: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0
  },
  parallaxWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: -2,
    left: 0
  },
  parallaxMask: {
    backgroundColor: 'rgba(0, 0, 0, 0.48)'
  },
  title: {
    position: 'absolute',
    left: '50%',
    width: 240,
    bottom: H_RADIUS_LINE + 10,
    transform: [
      {
        translateX: -120
      }
    ]
  },
  back: {
    ..._.header.left,
    zIndex: 1,
    marginTop: IOS ? -9 : -4
  },
  menu: {
    ..._.header.left,
    zIndex: 1,
    padding: _.sm,
    marginTop: IOS ? -16 : -12,
    marginLeft: -4,
    opacity: 0.8
  },
  more: {
    ..._.header.right,
    zIndex: 1,
    marginTop: IOS ? -8 : -4,
    opacity: 0.8
  },
  timeline: {
    ..._.header.right,
    zIndex: 1,
    marginTop: IOS ? -8 : -4,
    marginRight: _.device(40, 54),
    opacity: 0.8
  },
  setting: {
    ..._.header.right,
    zIndex: 1,
    marginTop: IOS ? -8 : -4,
    opacity: 0.8
  },
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 36,
    height: 36
  }
})
