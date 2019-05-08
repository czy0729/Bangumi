/*
 * @Author: czy0729
 * @Date: 2019-05-08 19:32:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-08 20:39:37
 */
import React from 'react'
import { StyleSheet, Animated, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { IconBack } from '@screens/_'
import _, { headerHeight as _headerHeight, colorPlain } from '@styles'
import Head from './head'
import Tabs from './tabs'
import { height } from './store'

// @todo 偏差了6pt, 有空再纠正
const headerHeight = _headerHeight + 6

const ParallaxImage = ({ scrollY }, { $, navigation }) => {
  const { avatar } = $.usersInfo
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
                outputRange: [1, 1, 0, 0]
              })
            }
          ]}
        >
          <Head style={styles.head} />
        </Animated.View>
        <IconBack style={_.header.left} navigation={navigation} />
      </View>
      <Animated.View
        style={[
          styles.tabs,
          {
            top: scrollY.interpolate({
              inputRange: [-height, 0, height - headerHeight, height],
              outputRange: [height * 2, height, headerHeight, headerHeight]
            })
          }
        ]}
      >
        <Tabs
          $={$}
          tabBarStyle={{
            backgroundColor: colorPlain
          }}
        />
      </Animated.View>
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
    marginTop: 64
  },
  tabs: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0
  }
})
