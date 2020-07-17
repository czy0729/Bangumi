/*
 * 触摸反馈整合
 * @Author: czy0729
 * @Date: 2019-03-28 15:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-16 22:33:09
 */
import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} from 'react-native'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { IOS } from '@constants'

let isCalled = false
let timer
function callOnceInInterval(functionTobeCalled, interval = 160) {
  if (!isCalled) {
    isCalled = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      isCalled = false
    }, interval)

    /**
     * 把点击事件放在requestAnimationFrame里面, 在安卓上面是两个完全不同的体验
     */
    return requestAnimationFrame(() => functionTobeCalled())
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

  const { ripple } = systemStore.setting
  if (IOS || !ripple) {
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

    // 绝大部分情况会return这个
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

export default observer(Touchable)

const styles = StyleSheet.create({
  touchable: {
    ...StyleSheet.absoluteFill,
    zIndex: 1
  }
})
