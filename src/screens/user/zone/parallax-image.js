/*
 * @Author: czy0729
 * @Date: 2019-05-08 19:32:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 04:31:10
 */
import React from 'react'
import { Animated, View, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Iconfont, Text } from '@components'
import { Popover, IconBack } from '@screens/_'
import { _ } from '@stores'
import { open, copy } from '@utils'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import { IOS, HOST } from '@constants'
import Head from './head'
import { H_BG, headerHeight } from './store'

function ParallaxImage({ scrollY, fixed }, { $, navigation }) {
  const styles = memoStyles()
  const { _image, _name } = $.params
  const { avatar = {}, nickname, id, username } = $.usersInfo
  const parallaxStyle = {
    transform: [
      {
        translateY: scrollY.interpolate({
          inputRange: [-H_BG, 0, H_BG - headerHeight, H_BG],
          outputRange: [
            H_BG / 2,
            0,
            -(H_BG - headerHeight),
            -(H_BG - headerHeight)
          ]
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

  const data = ['浏览器查看', '复制链接', '发短信', 'TA的收藏', 'TA的好友']
  if ($.users.connectUrl) {
    data.push('加为好友')
  } else if ($.users.disconnectUrl) {
    data.push('解除好友')
  }

  let uri = avatar.large
  if (_image) {
    if (_image.indexOf('http') === 0) {
      uri = _image
    } else {
      uri = `https:${_image}`
    }
  }
  const blurRadius = (IOS ? 2 : 1) - ($.bg ? 1 : 0)
  return (
    <>
      <View style={styles.parallax} pointerEvents={fixed ? 'none' : undefined}>
        <Animated.Image
          style={[styles.parallaxImage, parallaxStyle]}
          source={{
            uri: $.bg || uri
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
                inputRange: [-H_BG, 0, H_BG - headerHeight, H_BG],
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
                inputRange: [-H_BG, 0, H_BG - headerHeight, H_BG],
                outputRange: [0, 0, 1, 1]
              })
            }
          ]}
        >
          <Text
            style={styles.title}
            type={_.select('plain', 'title')}
            size={16}
            align='center'
            numberOfLines={1}
          >
            {HTMLDecode(nickname || _name)}
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.parallaxMask,
            parallaxStyle,
            {
              opacity: scrollY.interpolate({
                inputRange: [-H_BG, 0, H_BG - headerHeight, H_BG],
                outputRange: [1, 1, 0, 0]
              })
            }
          ]}
        >
          <Head style={styles.head} />
        </Animated.View>
      </View>
      <IconBack style={[_.header.left, styles.btn]} navigation={navigation} />
      <View
        style={[
          _.header.right,
          styles.btn,
          {
            padding: _.sm
          }
        ]}
      >
        <Popover
          data={data}
          onSelect={key => {
            t('空间.右上角菜单', {
              key,
              userId: $.userId
            })

            switch (key) {
              case '浏览器查看':
                open(`${HOST}/user/${username}`)
                break

              case '复制链接':
                copy(`${HOST}/user/${username}`)
                info('已复制')
                break

              case '发短信':
                navigation.push('PM', {
                  userId: id, // 必须是数字id
                  userName: HTMLDecode(nickname || _name)
                })
                break

              case 'TA的收藏':
                $.toUser(navigation)
                break

              case 'TA的好友':
                navigation.push('Friends', {
                  userId: username || id
                })
                break

              case '加为好友':
                $.doConnectFriend()
                break

              case '解除好友':
                setTimeout(() => {
                  Alert.alert('警告', '确定解除好友?', [
                    {
                      text: '取消',
                      style: 'cancel'
                    },
                    {
                      text: '确定',
                      onPress: () => $.doDisconnectFriend()
                    }
                  ])
                }, 400)
                break

              default:
                break
            }
          }}
        >
          <Iconfont size={24} name='more' color={_.__colorPlain__} />
        </Popover>
      </View>
    </>
  )
}

ParallaxImage.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(ParallaxImage)

const memoStyles = _.memoStyles(_ => ({
  parallax: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0
  },
  parallaxImage: {
    height: H_BG
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
    width: 200,
    bottom: _.sm + (IOS ? 5 : 12),
    transform: [
      {
        translateX: -100
      }
    ]
  },
  tabs: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0
  },
  btn: {
    zIndex: 1,
    marginTop: -5
  }
}))
