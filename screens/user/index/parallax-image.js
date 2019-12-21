/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-21 19:19:00
 */
import React from 'react'
import { Alert, Animated, View } from 'react-native'
import PropTypes from 'prop-types'
import { Text, Iconfont } from '@components'
import { Popover, IconHeader, IconBack } from '@screens/_'
import { _ } from '@stores'
import { open } from '@utils'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IOS } from '@constants'
import Head from './head'
import { height, headerHeight } from './store'

function ParallaxImage({ scrollY }, { $, navigation }) {
  const styles = memoStyles()
  const { id, avatar = {}, nickname } = $.usersInfo
  const isMe = $.myUserId === id
  const parallaxStyle = {
    transform: [
      {
        translateY: scrollY.interpolate({
          inputRange: [-height, 0, height - headerHeight, height],
          outputRange: [
            height / 2,
            0,
            -(height - headerHeight),
            -(height - headerHeight)
          ]
        })
      },
      {
        scale: scrollY.interpolate({
          inputRange: [-height, 0, height],

          // -h: 2, 0: 1, h: 1 当scrollY在-h到0时, scale按照2-1的动画运动
          // 当scrollY在0-h时, scale不变. 可以输入任意数量对应的值, 但必须是递增或者相等
          outputRange: [2, 1, 1]
        })
      }
    ]
  }

  let data
  if (isMe) {
    data = ['我的好友', 'netabare', '缺少收藏?']
  } else {
    data = ['TA的好友', 'TA的netabare']
  }

  return (
    <>
      <View style={styles.parallax} pointerEvents='none'>
        <Animated.Image
          style={[styles.parallaxImage, parallaxStyle]}
          source={{
            uri: avatar.large
          }}
          blurRadius={IOS ? 2 : 1}
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
                inputRange: [-height, 0, height - headerHeight, height],
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
                inputRange: [-height, 0, height - headerHeight, height],
                outputRange: [0, 0, 1, 1]
              })
            }
          ]}
        >
          <Text style={styles.title} size={16} align='center' numberOfLines={1}>
            {nickname}
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.parallaxMask,
            parallaxStyle,
            {
              opacity: scrollY.interpolate({
                inputRange: [-height, 0, height - headerHeight, height],
                outputRange: [1, 1, 0, 0]
              })
            }
          ]}
        >
          <Head style={styles.head} />
        </Animated.View>
      </View>
      {!!$.params.userId && (
        <IconBack
          style={[_.header.left, styles.btn]}
          navigation={navigation}
          color={_.__colorPlain__}
        />
      )}
      <View style={[_.header.right, styles.btn, styles.more]}>
        <Popover
          data={data}
          onSelect={key => {
            t('我的.右上角菜单', {
              key
            })

            switch (key) {
              case '我的好友':
                navigation.push('Friends')
                break
              case 'TA的好友':
                navigation.push('Friends', {
                  userId: id
                })
                break
              case 'netabare':
              case 'TA的netabare':
                open(`https://netaba.re/user/${id}`)
                break
              case '缺少收藏?':
                setTimeout(() => {
                  Alert.alert(
                    '提示',
                    '因隐藏条目受登陆状态影响, 若条目没找到, 可以尝试重新登陆',
                    [
                      {
                        text: '好的'
                      }
                    ]
                  )
                }, 400)
                break
              default:
                break
            }
          }}
        >
          <Iconfont name='more' color={_.__colorPlain__} />
        </Popover>
      </View>
      {!$.params.userId && (
        <IconHeader
          style={[_.header.right, styles.btn, styles.setting]}
          name='setting'
          color={_.__colorPlain__}
          onPress={() => {
            t('我的.跳转', {
              to: 'Setting'
            })

            navigation.push('Setting')
          }}
        />
      )}
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
    height,
    backgroundColor: _.colorPlain
  },
  parallaxMask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
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
    color: _.__colorPlain__,
    transform: [
      {
        translateX: -100
      }
    ]
  },
  btn: {
    zIndex: 1
  },
  more: {
    padding: _.sm
  },
  setting: {
    right: 44
  }
}))
