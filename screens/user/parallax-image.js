/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-05 22:59:12
 */
import React from 'react'
import { StyleSheet, Alert, Animated, View } from 'react-native'
import PropTypes from 'prop-types'
import { Text } from '@components'
import { IconHeader, IconBack } from '@screens/_'
import { observer } from '@utils/decorators'
import { IOS } from '@constants'
import _ from '@styles'
import Head from './head'
import { height, headerHeight } from './store'

const ParallaxImage = ({ scrollY }, { $, navigation }) => {
  const { id, avatar, nickname } = $.usersInfo
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

  return (
    <>
      <View style={styles.parallax}>
        <Animated.Image
          pointerEvents='none'
          style={[styles.parallaxImage, parallaxStyle]}
          source={{ uri: avatar.large }}
          blurRadius={IOS ? 2 : 1}
        />
        <Animated.View
          style={[
            styles.parallaxMask,
            parallaxStyle,
            {
              backgroundColor: 'rgba(0, 0, 0, 0.48)',
              opacity: scrollY.interpolate({
                inputRange: [-height, 0, height - headerHeight, height],
                outputRange: [0, 0.4, 1, 1]
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
          <Text
            style={styles.title}
            type='plain'
            size={16}
            align='center'
            numberOfLines={1}
          >
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
          {isMe && (
            <IconHeader
              style={[_.header.right, styles.information]}
              name='information'
              color={_.colorIconPlain}
              onPress={() =>
                Alert.alert(
                  '提示',
                  '因隐藏条目受登陆状态影响, 若条目没找到, 可以尝试重新登陆',
                  [
                    {
                      text: '好的'
                    }
                  ]
                )
              }
            />
          )}
        </Animated.View>
        {!isMe && (
          <IconBack
            style={_.header.left}
            navigation={navigation}
            color={_.colorPlain}
          />
        )}
        <IconHeader
          style={_.header.right}
          name='setting'
          color={_.colorPlain}
          onPress={() => navigation.push('Setting')}
        />
        <IconHeader
          style={[_.header.right, styles.friend]}
          name='friends'
          color={_.colorPlain}
          onPress={() => navigation.push('Friends')}
        />
      </View>
    </>
  )
}

ParallaxImage.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(ParallaxImage)

const styles = StyleSheet.create({
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
    transform: [
      {
        translateX: -100
      }
    ]
  },
  information: {
    position: 'absolute',
    top: undefined,
    bottom: _.sm
  },
  friend: {
    right: 44
  }
})
