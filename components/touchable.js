/*
 * 触摸反馈整合
 * @Author: czy0729
 * @Date: 2019-03-28 15:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-08 02:11:26
 */
import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} from 'react-native'
import { _ } from '@stores'
import { IOS } from '@constants'

let isCalled = false
let timer

function callOnceInInterval(functionTobeCalled, interval = 400) {
  if (!isCalled) {
    isCalled = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      isCalled = false
    }, interval)
    return functionTobeCalled()
  }
  return false
}

function Touchable({
  style,
  withoutFeedback,
  highlight,
  children,
  delay,
  onPress,
  ...other
}) {
  if (withoutFeedback) {
    return (
      <TouchableOpacity
        style={style}
        activeOpacity={1}
        {...other}
        onPress={delay ? () => callOnceInInterval(onPress) : onPress}
      >
        {children}
      </TouchableOpacity>
    )
  }

  if (IOS) {
    if (highlight) {
      return (
        <View style={style}>
          <TouchableHighlight
            style={styles.touchable}
            activeOpacity={1}
            underlayColor={_.colorHighLight}
            {...other}
            onPress={delay ? () => callOnceInInterval(onPress) : onPress}
          >
            <View />
          </TouchableHighlight>
          {children}
        </View>
      )
    }

    return (
      <TouchableOpacity
        style={style}
        activeOpacity={0.64}
        {...other}
        onPress={delay ? () => callOnceInInterval(onPress) : onPress}
      >
        {children}
      </TouchableOpacity>
    )
  }

  return (
    <View style={style}>
      <TouchableNativeFeedback
        {...other}
        onPress={delay ? () => callOnceInInterval(onPress) : onPress}
      >
        <View style={styles.touchable} />
      </TouchableNativeFeedback>
      {children}
    </View>
  )
}

Touchable.defaultProps = {
  style: undefined,
  withoutFeedback: false,
  highlight: false,
  delay: true,
  onPress: Function.prototype
}

export default Touchable

const styles = StyleSheet.create({
  touchable: {
    ...StyleSheet.absoluteFill,
    zIndex: 1
  }
})
