/*
 * 触摸反馈整合
 * @Author: czy0729
 * @Date: 2019-03-28 15:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-06 07:27:56
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
  top: _.device(-2, -4),
  right: _.device(-2, -4),
  bottom: _.device(-2, -4),
  left: _.device(-2, -4)
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
    return requestAnimationFrame(() => functionTobeCalled())
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
    onPress = Function.prototype,
    ...other
  }) => {
    if (withoutFeedback) {
      return (
        <TouchableOpacity
          style={style}
          activeOpacity={1}
          hitSlop={hitSlop}
          {...other}
          onPress={delay ? () => callOnceInInterval(onPress) : onPress}
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
              hitSlop={hitSlop}
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
          hitSlop={hitSlop}
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
          hitSlop={hitSlop}
          {...other}
          onPress={delay ? () => callOnceInInterval(onPress) : onPress}
        >
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
