/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 20:34:39
 */
import React from 'react'
import { Animated, View } from 'react-native'
import { Flex, Text, Iconfont, Heatmap } from '@components'
import {
  Popover,
  IconHeader,
  // IconTouchable,
  IconBack,
  Avatar
} from '@screens/_'
import { _ } from '@stores'
import { open } from '@utils'
import { HTMLDecode } from '@utils/html'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IOS } from '@constants'
import Head from './head'
import { H_BG, H_HEADER } from './store'

const dataMe = [
  '我的空间',
  '我的好友',
  '我的人物',
  '我的目录',
  '我的日志',
  '我的netaba.re'
]
const dataOther = ['TA的好友', 'TA的netaba.re']

function ParallaxImage({ scrollY, fixed }, { $, navigation }) {
  const styles = memoStyles()
  const { id, avatar = {}, nickname, username } = $.usersInfo
  const isMe = $.myUserId === id
  const parallaxStyle = {
    transform: [
      {
        translateY: scrollY.interpolate({
          inputRange: [-H_BG, 0, H_BG - H_HEADER, H_BG],
          outputRange: [H_BG / 2, 0, -(H_BG - H_HEADER), -(H_BG - H_HEADER)]
        })
      }
    ]
  }

  // 安卓没有弹簧效果不需要形变
  if (IOS) {
    parallaxStyle.transform.push({
      scale: scrollY.interpolate({
        inputRange: [-H_BG, 0, H_BG],

        // -h: 2, 0: 1, h: 1 当scrollY在-h到0时, scale按照2-1的动画运动
        // 当scrollY在0-h时, scale不变. 可以输入任意数量对应的值, 但必须是递增或者相等
        outputRange: [2, 1, 1]
      })
    })
  }

  const data = isMe ? dataMe : dataOther
  const blurRadius = (IOS ? 2 : 1) - ($.bg ? 1 : 0)
  let uri = $.bg || avatar.large
  if (typeof uri === 'string') {
    uri = uri.replace('http://', 'https://')
  }

  return (
    <>
      <View style={styles.parallax} pointerEvents={fixed ? 'none' : undefined}>
        <Animated.Image
          style={[styles.parallaxImage, parallaxStyle]}
          source={{
            uri
          }}
          blurRadius={blurRadius}
        />
        <Animated.View
          style={[
            styles.parallaxMask,
            parallaxStyle,
            {
              backgroundColor: _.select(
                'rgba(0, 0, 0, 0.48)',
                'rgba(0, 0, 0, 0.64)'
              ),
              opacity: scrollY.interpolate({
                inputRange: [-H_BG, 0, H_BG - H_HEADER, H_BG],
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
                inputRange: [-H_BG, 0, H_BG - H_HEADER, H_BG],
                outputRange: [0, 0, 1, 1]
              })
            }
          ]}
        >
          <Flex style={styles.title} justify='center'>
            <Avatar size={28} src={$.avatar || avatar.large} />
            <Text
              style={_.ml.sm}
              type={_.select('plain', 'title')}
              align='center'
              bold
              numberOfLines={1}
            >
              {HTMLDecode(nickname)}
            </Text>
          </Flex>
        </Animated.View>
        <Animated.View
          style={[
            styles.parallaxMask,
            parallaxStyle,
            {
              opacity: scrollY.interpolate({
                inputRange: [-H_BG, 0, H_BG - H_HEADER, H_BG],
                outputRange: [1, 1, 0, 0]
              })
            }
          ]}
        >
          <Head style={styles.head} />
          {/* {isMe && (
            <IconTouchable
              style={styles.userSetting}
              name='break'
              color={_.__colorPlain__}
              size={20}
              onPress={() => {
                t('我的.跳转', {
                  to: 'UserSetting'
                })

                navigation.push('UserSetting')
              }}
            />
          )} */}
        </Animated.View>
      </View>
      {!!$.params.userId && (
        <IconBack
          style={styles.back}
          navigation={navigation}
          color={_.__colorPlain__}
        />
      )}
      <View style={[isMe ? styles.menu : styles.more]}>
        <Popover
          data={data}
          onSelect={key => {
            t('我的.右上角菜单', {
              key
            })

            switch (key) {
              case '我的空间':
                navigation.push('Zone', {
                  userId: $.userId
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
          }}
        >
          <Iconfont name='list' color={_.__colorPlain__} />
          <Heatmap right={-40} id='我的.右上角菜单' />
        </Popover>
      </View>
      <IconHeader
        style={styles.timeline}
        name='time'
        color={_.__colorPlain__}
        onPress={() => {
          t('我的.跳转', {
            to: 'UserTimeline'
          })

          const data = {
            userId: username || id
          }
          if ($.params.userId) {
            data.userName = nickname
          }
          navigation.push('UserTimeline', data)
        }}
      >
        <Heatmap
          right={48}
          id='我的.跳转'
          data={{
            to: 'UserTimeline',
            alias: '时间线'
          }}
        />
      </IconHeader>
      {!$.params.userId && (
        <IconHeader
          style={styles.setting}
          name='setting'
          color={_.__colorPlain__}
          onPress={() => {
            t('我的.跳转', {
              to: 'Setting'
            })

            navigation.push('Setting')
          }}
        >
          <Heatmap
            id='我的.跳转'
            data={{
              to: 'Setting',
              alias: '设置'
            }}
          />
        </IconHeader>
      )}
    </>
  )
}

export default obc(ParallaxImage)

const memoStyles = _.memoStyles(_ => ({
  parallax: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0
  },
  parallaxImage: {
    marginTop: -8,
    height: H_BG + 8
  },
  parallaxMask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: -_.hairlineWidth,
    left: 0
  },
  head: {
    marginTop: 76
  },
  title: {
    position: 'absolute',
    left: '50%',
    width: 240,
    bottom: _.sm + 1,
    transform: [
      {
        translateX: -120
      }
    ]
  },
  back: {
    ..._.header.left,
    zIndex: 1,
    marginTop: -5
  },
  menu: {
    ..._.header.left,
    zIndex: 1,
    padding: _.sm,
    marginTop: -5,
    marginLeft: 2,
    opacity: 0.64
  },
  more: {
    ..._.header.right,
    zIndex: 1,
    padding: _.sm,
    marginTop: -5,
    opacity: 0.64
  },
  timeline: {
    ..._.header.right,
    zIndex: 1,
    marginTop: -5,
    marginRight: 34,
    opacity: 0.64
  },
  setting: {
    ..._.header.right,
    zIndex: 1,
    marginTop: -5,
    opacity: 0.64
  },
  userSetting: {
    ..._.header.right,
    top: H_BG - 48,
    zIndex: 1,
    marginTop: -5,
    opacity: 0.64
  }
}))
