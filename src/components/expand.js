/*
 * 收缩展开框
 * @Author: czy0729
 * @Date: 2019-05-09 16:49:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-24 15:22:35
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { LinearGradient } from 'expo-linear-gradient'
import { _ } from '@stores'
import Iconfont from './iconfont'
import Touchable from './touchable'

const size = 216 // 1个比例的最大高度

export default
@observer
class Expand extends React.Component {
  static defaultProps = {
    style: undefined,
    ratio: 0.8 // 比例
  }

  state = {
    maxHeight: 0,
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
        maxHeight: height,
        height,
        layouted: true,
        expand: true
      })
      return
    }

    this.setState({
      maxHeight,
      height,
      layouted: true
    })
  }

  onExpand = () => {
    this.setState({
      expand: true
    })
  }

  render() {
    const { style, children } = this.props
    const { maxHeight, height, layouted, expand } = this.state

    /**
     * 算出内容实际高度
     * 有时候文字太长, 最后一行文字高度没算上, 插入一个placeholder来规避这个问题
     */
    if (!layouted) {
      return (
        <View style={styles.layout} onLayout={this.onLayout}>
          <View>{children}</View>
        </View>
      )
    }

    return (
      <View
        style={[
          styles.container,
          style,
          {
            height: expand ? 'auto' : maxHeight || height
          }
        ]}
      >
        <View style={{ height }}>{children}</View>
        {!expand && (
          <>
            <LinearGradient
              style={styles.linear}
              colors={[
                `rgba(${_.colorPlainRaw.join()}, 0.16)`,
                `rgba(${_.colorPlainRaw.join()}, 1)`,
                `rgba(${_.colorPlainRaw.join()}, 1)`
              ]}
            />
            <Touchable style={styles.more} onPress={this.onExpand}>
              <Iconfont name='down' size={20} />
            </Touchable>
          </>
        )}
      </View>
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
    height: 64,
    marginBottom: -2
  },
  more: {
    position: 'absolute',
    left: '50%',
    bottom: 0,
    padding: _.sm,
    marginLeft: -16
  }
})
