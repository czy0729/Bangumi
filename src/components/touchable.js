/*
 * 触摸反馈整合
 * @Author: czy0729
 * @Date: 2019-03-28 15:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-17 19:26:47
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
import { _ } from '@stores'
import { getSystemStoreAsync } from '@utils/async'
import { IOS } from '@constants'

const defaultHitSlop = {
  top: _.device(3, 4),
  right: _.device(2, 4),
  bottom: _.device(3, 4),
  left: _.device(2, 4)
}

/**
 * 防止瞬间多次点击
 * @param {*} functionTobeCalled
 */
let isCalled = false
let timer
function callOnceInInterval(functionTobeCalled, interval = 40) {
  if (!isCalled) {
    isCalled = true
    clearTimeout(timer)
    timer = setTimeout(() => (isCalled = false), interval)

    /**
     * 把点击事件放在requestAnimationFrame里面, 在安卓上面是两个完全不同的体验
     */
    return setTimeout(() => {
      functionTobeCalled()
    }, 0);
  }

  return false
}

export const Touchable = observer(
  ({
    style,
    withoutFeedback = false,
    highlight = false,
    delay = true,
    children,
    hitSlop = defaultHitSlop,
    delayPressIn = 0,
    delayPressOut = 0,
    onPress = Function.prototype,
    ...other
  }) => {
    const passProps = {
      hitSlop,
      delayPressIn,
      delayPressOut,
      onPress: delay ? () => callOnceInInterval(onPress) : onPress
    }

    if (withoutFeedback) {
      return (
        <TouchableOpacity
          style={style}
          activeOpacity={1}
          {...other}
          {...passProps}
        >
          {children}
        </TouchableOpacity>
      )
    }

    const { ripple } = getSystemStoreAsync().setting
    if (IOS || !ripple) {
      if (highlight) {
        return (
          <View style={style}>
            <TouchableHighlight
              style={styles.touchable}
              activeOpacity={1}
              underlayColor={_.colorHighLight}
              {...other}
              {...passProps}
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
          {...passProps}
        >
          {children}
        </TouchableOpacity>
      )
    }

    return (
      <View style={style}>
        <TouchableNativeFeedback {...other} {...passProps}>
          <View style={styles.touchable} />
        </TouchableNativeFeedback>
        {children}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  touchable: {
    ...StyleSheet.absoluteFill,
    zIndex: 1
  }
})
