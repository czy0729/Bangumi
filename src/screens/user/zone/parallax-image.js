/*
 * @Author: czy0729
 * @Date: 2019-05-08 19:32:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 04:40:48
 */
import React from 'react'
import { Animated, View } from 'react-native'
import { Flex, Iconfont, Text, Heatmap } from '@components'
import { Popover, IconBack, Avatar } from '@_'
import { _ } from '@stores'
import { open, copy } from '@utils'
import { obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { confirm } from '@utils/ui'
import { IOS, HOST } from '@constants'
import Head from './head'
import { H_HEADER, H_RADIUS_LINE } from './store'

function ParallaxImage(props, { $, navigation }) {
  const styles = memoStyles()
  const { _image, _name } = $.params
  const { fixed } = $.state
  const { avatar = {}, nickname, id, username } = $.usersInfo
  const parallaxStyle = {
    transform: [
      {
        translateY: $.scrollY.interpolate({
          inputRange: [
            -_.parallaxImageHeight,
            0,
            _.parallaxImageHeight - H_HEADER,
            _.parallaxImageHeight
          ],
          outputRange: [
            _.parallaxImageHeight / 2,
            0,
            -(_.parallaxImageHeight - H_HEADER),
            -(_.parallaxImageHeight - H_HEADER)
          ]
        })
      }
    ]
  }

  // 安卓没有弹簧效果不需要形变
  if (IOS) {
    parallaxStyle.transform.push({
      scale: $.scrollY.interpolate({
        inputRange: [-_.parallaxImageHeight, 0, _.parallaxImageHeight],

        // -h: 2, 0: 1, h: 1 当scrollY在-h到0时, scale按照2-1的动画运动
        // 当scrollY在0-h时, scale不变. 可以输入任意数量对应的值, 但必须是递增或者相等
        outputRange: [2, 1, 1]
      })
    })
  }

  const data = ['浏览器查看', '复制链接', '复制分享', '发短信', 'TA的收藏', 'TA的好友']
  if ($.users.connectUrl) {
    data.push('加为好友')
  } else if ($.users.disconnectUrl) {
    data.push('解除好友')
  }

  let uri = avatar.large
  if (_image) {
    if (_image?.indexOf('http') === 0) {
      uri = _image
    } else {
      uri = `https:${_image}`
    }
  }

  uri = $.bg || $.avatar || uri
  if (typeof uri === 'string') uri = uri.replace('http://', 'https://')

  const blurRadius = uri === $.bg ? 0 : 8
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
            styles.parallaxWrap,
            parallaxStyle,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: 'rgba(0, 0, 0, 0.24)',
              opacity: $.scrollY.interpolate({
                inputRange: [
                  -_.parallaxImageHeight,
                  0,
                  _.parallaxImageHeight - H_HEADER,
                  _.parallaxImageHeight
                ],
                outputRange: _.select([0, 0.4, 1, 1], [0.4, 0.8, 1, 1])
              })
            }
          ]}
        />
        <Animated.View
          style={[
            styles.parallaxWrap,
            parallaxStyle,
            {
              opacity: $.scrollY.interpolate({
                inputRange: [
                  -_.parallaxImageHeight,
                  0,
                  _.parallaxImageHeight - H_HEADER,
                  _.parallaxImageHeight
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
              src={$.src}
              borderWidth={0}
              fallbackSrc={avatar.large}
            />
            <Text
              style={_.ml.sm}
              type={_.select('plain', 'title')}
              align='center'
              bold
              numberOfLines={1}
            >
              {HTMLDecode(nickname || _name)}
            </Text>
          </Flex>
        </Animated.View>
        <Animated.View style={[styles.parallaxWrap, parallaxStyle]}>
          <Animated.View
            style={{
              opacity: $.scrollY.interpolate({
                inputRange: [
                  -_.parallaxImageHeight,
                  0,
                  _.parallaxImageHeight - H_HEADER,
                  _.parallaxImageHeight
                ],
                outputRange: [1, 1, 0, 0]
              })
            }}
          >
            <Head style={styles.head} />
          </Animated.View>
          <View style={styles.parallaxLine} />
        </Animated.View>
      </View>
      <View style={[_.header.left, styles.btn]}>
        <IconBack navigation={navigation} color={_.__colorPlain__} />
      </View>
      <View style={[_.header.right, styles.touch]}>
        <Popover
          data={data}
          onSelect={key => {
            t('空间.右上角菜单', {
              key,
              userId: $.userId
            })

            const url = `${HOST}/user/${username}`
            const userName = HTMLDecode(nickname || _name)
            switch (key) {
              case '浏览器查看':
                open(url)
                break

              case '复制链接':
                copy(url, '已复制链接')
                break

              case '复制分享':
                copy(`【链接】${userName} | Bangumi番组计划\n${url}`, '已复制分享文案')
                break

              case '发短信':
                navigation.push('PM', {
                  userId: id, // 必须是数字id
                  userName
                })
                break

              case 'TA的收藏':
                $.navigateToUser(navigation)
                break

              case 'TA的好友':
                navigation.push('Friends', {
                  userId: username || id
                })
                break

              case '加为好友':
                $.doConnect()
                break

              case '解除好友':
                confirm('确定解除好友?', () => $.doDisconnect())
                break

              default:
                break
            }
          }}
        >
          <Flex style={styles.icon} justify='center'>
            <Iconfont name='md-more-vert' color={_.__colorPlain__} />
          </Flex>
          <Heatmap id='空间.右上角菜单' />
          <Heatmap right={62} id='空间.添加好友' transparent />
          <Heatmap right={113} id='空间.解除好友' transparent />
          <Heatmap
            right={170}
            id='空间.跳转'
            to='WebBrowser'
            alias='浏览器'
            transparent
          />
        </Popover>
      </View>
    </>
  )
}

export default obc(ParallaxImage)

const memoStyles = _.memoStyles(() => ({
  parallax: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0
  },
  parallaxImage: {
    marginTop: -8,
    height: _.parallaxImageHeight + 8
  },
  parallaxWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: -2,
    left: 0
  },
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
  head: {
    marginTop: (_.parallaxImageHeight - 120) / 2
  },
  title: {
    position: 'absolute',
    left: '50%',
    width: 240,
    bottom: H_RADIUS_LINE + 14,
    transform: [
      {
        translateX: -120
      }
    ]
  },
  btn: {
    zIndex: 1,
    marginTop: -8
  },
  touch: {
    zIndex: 1,
    marginTop: -6,
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 36,
    height: 36,
    marginRight: -2
  },
  avatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }
}))
