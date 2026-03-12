/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-12 20:58:43
 */
import React, { useCallback, useMemo } from 'react'
import { Animated, View } from 'react-native'
import { Flex, Heatmap, Iconfont, Text } from '@components'
import { Avatar, IconBack, IconHeader, IconSensor, Popover, SensorParallaxCard } from '@_'
import { _, systemStore } from '@stores'
import { feedback, HTMLDecode, open } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useInsets } from '@utils/hooks'
import { HOST_NETABA, IOS } from '@constants'
import { IS_IOS_5_6_7_8 } from '@styles'
import HeaderComponent from '../../component/header-component'
import { H_HEADER } from '../../ds'
import Bg from './bg'
import { COMPONENT_MAIN, DATA_ME, DATA_OTHER, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

import type { UserId } from '@types'

export default memo(
  ({
    navigation,
    themeStyles,
    parallaxImageHeight = 0,
    avatar = {},
    fixed = false,
    id = '',
    myUserId = '',
    nickname = '',
    paramsUserId = '',
    scrollY = new Animated.Value(0),
    src = '',
    textType = 'plain',
    userId = '',
    username = '',
    userSensor = true
  }) => {
    const { statusBarHeight } = useInsets()

    const headerStyle = useMemo(() => {
      const top = IOS ? statusBarHeight + (IS_IOS_5_6_7_8 ? 12 : 8) : statusBarHeight + 12

      return {
        left: {
          position: 'absolute',
          top,
          left: 4
        },
        right: {
          position: 'absolute',
          top,
          right: 8
        }
      } as const
    }, [statusBarHeight])

    const parallaxStyle = useMemo(() => {
      return {
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
          },
          {
            // 安卓没有弹簧效果不需要形变
            scale: IOS
              ? scrollY.interpolate({
                  inputRange: [-parallaxImageHeight, 0, parallaxImageHeight],

                  // -h: 2, 0: 1, h: 1 当 scrollY 在 -h 到 0 时, scale 按照 2-1 的动画运动
                  // 当 scrollY 在 0-h 时, scale 不变. 可以输入任意数量对应的值, 但必须是递增或者相等
                  outputRange: [2, 1, 1]
                })
              : 1
          }
        ]
      } as const
    }, [parallaxImageHeight, scrollY])

    const handleSelect = useCallback(
      (key: string) => {
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

        t('我的.右上角菜单', {
          key
        })
      },
      [navigation, userId, username, id]
    )

    const elHeader = useMemo(
      () => (
        <View style={themeStyles.head}>
          <HeaderComponent />
        </View>
      ),
      [themeStyles]
    )

    const elBg = useMemo(
      () => (
        <>
          <Bg style={parallaxStyle} fixed={fixed} />

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
            pointerEvents='none'
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
            pointerEvents='none'
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
              {userSensor ? (
                <SensorParallaxCard sensitivity={0.3} enabled={!fixed} enableRotate={false} reverse>
                  {elHeader}
                </SensorParallaxCard>
              ) : (
                elHeader
              )}

              <View style={[headerStyle.right, styles.sensor]}>
                <IconSensor
                  enabled={userSensor}
                  onPress={() => {
                    systemStore.switchSetting('userSensor')
                    feedback(true)
                  }}
                />
              </View>
            </Animated.View>

            <View style={themeStyles.parallaxLine} />
          </Animated.View>
        </>
      ),
      [
        avatar.large,
        elHeader,
        fixed,
        headerStyle,
        nickname,
        parallaxImageHeight,
        parallaxStyle,
        scrollY,
        src,
        textType,
        themeStyles,
        userSensor
      ]
    )

    const elContent = useMemo(() => {
      const isMe = !!id && myUserId === id
      const data = isMe ? DATA_ME : DATA_OTHER

      return (
        <>
          {!!paramsUserId && (
            <View style={[headerStyle.left, styles.back]}>
              <IconBack navigation={navigation} color={_.__colorPlain__} />
            </View>
          )}

          <View
            style={
              paramsUserId
                ? [headerStyle.right, styles.more]
                : isMe
                ? [headerStyle.left, styles.menu]
                : [headerStyle.right, styles.more]
            }
          >
            <Popover style={styles.touch} data={data} onSelect={handleSelect}>
              <Flex style={styles.icon} justify='center'>
                <Iconfont name='md-menu' color={_.__colorPlain__} shadow />
              </Flex>
              <Heatmap right={-40} id='我的.右上角菜单' />
            </Popover>
          </View>

          <View style={[headerStyle.right, styles.timeline]}>
            <IconHeader
              name='md-image-aspect-ratio'
              color={_.__colorPlain__}
              size={21}
              shadow
              onPress={() => {
                const data: {
                  userId: UserId
                  userName?: string
                } = {
                  userId: username || id
                }
                if (paramsUserId) data.userName = nickname

                navigation.push('Milestone', data)

                t('我的.跳转', {
                  to: 'Milestone'
                })
              }}
            />
          </View>

          {!paramsUserId && (
            <View style={[headerStyle.right, styles.setting]}>
              <IconHeader
                name='setting'
                color={_.__colorPlain__}
                shadow
                onPress={() => {
                  navigation.push('Setting')

                  t('我的.跳转', {
                    to: 'Setting'
                  })
                }}
              />
              <Heatmap id='我的.跳转' to='Setting' alias='设置' />
            </View>
          )}
        </>
      )
    }, [id, myUserId, paramsUserId, headerStyle, navigation, handleSelect, username, nickname])

    return (
      <>
        <View style={styles.parallax} pointerEvents={fixed ? 'none' : 'auto'}>
          {elBg}
        </View>
        {elContent}
      </>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)
