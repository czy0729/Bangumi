/*
 * @Author: czy0729
 * @Date: 2019-05-09 16:49:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-10 19:29:51
 */
import React from 'react'
import { StyleSheet, Animated, View } from 'react-native'
import _ from '@styles'
import Touchable from './touchable'
import Iconfont from './iconfont'

export default class Expand extends React.Component {
  static defaultProps = {
    maxHeight: 0
  }

  state = {
    maxHeight: new Animated.Value(0),
    height: 0,
    layouted: false,
    expand: false
  }

  onLayout = ({ nativeEvent }) => {
    const { maxHeight } = this.props
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
          <Touchable style={styles.more} onPress={this.onExpand}>
            <Iconfont name='down' size={16} />
          </Touchable>
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
  more: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingVertical: _.sm,
    paddingLeft: _.sm,
    backgroundColor: _.colorPlain
  }
})
