/*
 * @Author: czy0729
 * @Date: 2019-05-08 19:32:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-26 22:47:04
 */
import React from 'react'
import { StyleSheet, Animated, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Popover, Menu, Iconfont, Text } from '@components'
import { IconBack } from '@screens/_'
import { open } from '@utils'
import { IOS, HOST } from '@constants'
import _ from '@styles'
import Head from './head'
import { height, headerHeight } from './store'

const ParallaxImage = ({ scrollY }, { $, navigation }) => {
  const { id, avatar, nickname } = $.usersInfo
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

  const data = ['浏览器查看', '详细收藏信息']
  const onSelect = label => {
    if (label === '详细收藏信息') {
      navigation.push('User', {
        userId: id,
        _name: nickname,
        _image: avatar.large
      })
    } else {
      open(`${HOST}/user/${id}`)
    }
  }
  const popoverProps = IOS
    ? {
        overlay: <Menu data={data} onSelect={onSelect} />
      }
    : {
        data,
        onSelect
      }

  return (
    <>
      <View style={styles.parallax}>
        <Animated.Image
          pointerEvents='none'
          style={[styles.parallaxImage, parallaxStyle]}
          source={{ uri: avatar.large }}
          blurRadius={2}
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
        </Animated.View>
        <IconBack style={_.header.left} navigation={navigation} />
        <View
          style={[
            _.header.right,
            {
              padding: _.sm
            }
          ]}
        >
          <Popover placement='bottom' {...popoverProps}>
            <Iconfont size={24} name='more' color={_.colorPlain} />
          </Popover>
        </View>
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
    height
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
  tabs: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0
  }
})
