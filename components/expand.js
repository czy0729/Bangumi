/*
 * 收缩展开框
 * @Author: czy0729
 * @Date: 2019-05-09 16:49:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-26 12:06:01
 */
import React from 'react'
import { StyleSheet, Animated, View } from 'react-native'
import { LinearGradient } from 'expo'
// import { LinearGradient } from 'expo-linear-gradient'
import _ from '@styles'
import Iconfont from './iconfont'
import Touchable from './touchable'

const size = 216 // 1个比例的最大高度

export default class Expand extends React.Component {
  static defaultProps = {
    style: undefined,
    ratio: 1 // 比例
  }

  state = {
    maxHeight: new Animated.Value(0),
    height: 0,
    layouted: false,
    expand: false
  }

  onLayout = ({ nativeEvent }) => {
    const { ratio } = this.props
    const maxHeight = ratio * size
    const { height } = nativeEvent.layout
    if (height < maxHeight) {
      this.setState({
        maxHeight: new Animated.Value(height),
        height,
        layouted: true,
        expand: true
      })
      return
    }

    this.setState({
      maxHeight: new Animated.Value(maxHeight),
      height,
      layouted: true
    })
  }

  onExpand = () => {
    const { maxHeight, height } = this.state
    Animated.timing(maxHeight, {
      toValue: height,
      duration: 600
    }).start()
    this.setState({
      expand: true
    })
  }

  render() {
    const { style, children } = this.props
    const { maxHeight, height, layouted, expand } = this.state

    // 算出内容实际高度
    if (!layouted) {
      return (
        <View style={styles.layout} onLayout={this.onLayout}>
          {children}
        </View>
      )
    }

    return (
      <Animated.View
        style={[
          styles.container,
          style,
          {
            maxHeight
          }
        ]}
      >
        <View style={{ height }}>{children}</View>
        {!expand && (
          <>
            <LinearGradient
              style={styles.linear}
              colors={[
                'rgba(255, 255, 255, 0.16)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)'
              ]}
            />
            <Touchable style={styles.more} onPress={this.onExpand}>
              <Iconfont name='down' size={20} />
            </Touchable>
          </>
        )}
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    opacity: 0
  },
  container: {
    overflow: 'hidden'
  },
  linear: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    height: 64
  },
  more: {
    position: 'absolute',
    left: '50%',
    bottom: 0,
    padding: _.sm,
    marginLeft: -16
  }
})
