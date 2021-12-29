/*
 * 触摸反馈整合
 * @Author: czy0729
 * @Date: 2019-03-28 15:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-29 18:08:45
 */
import React from 'react'
import {
  View,
  TouchableNativeFeedback as RNTouchableNativeFeedback,
  TouchableHighlight as RNTouchableHighlight,
  TouchableOpacity as RNTouchableOpacity
} from 'react-native'
import {
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native-gesture-handler'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { getSystemStoreAsync } from '@utils/async'
import { IOS } from '@constants'
import { defaultHitSlop, styles, callOnceInInterval } from './utils'

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
    useRN = false,
    onPress = Function.prototype,
    ...other
  }) => {
    const passProps = {
      hitSlop,
      delayPressIn,
      delayPressOut,
      onPress: delay ? () => callOnceInInterval(onPress) : onPress
    }
    let Component

    if (withoutFeedback) {
      Component = useRN ? RNTouchableOpacity : TouchableOpacity
      return (
        <Component style={style} activeOpacity={1} {...other} {...passProps}>
          {children}
        </Component>
      )
    }

    const { ripple } = getSystemStoreAsync().setting
    if (!IOS && ripple) {
      Component = useRN ? RNTouchableNativeFeedback : TouchableNativeFeedback
      return (
        <View style={style}>
          <Component {...other} {...passProps}>
            <View style={styles.touchable} />
          </Component>
          {children}
        </View>
      )
    }

    if (highlight) {
      Component = useRN ? RNTouchableHighlight : TouchableHighlight
      return (
        <View style={style}>
          <Component
            style={styles.touchable}
            activeOpacity={1}
            underlayColor={_.colorHighLight}
            {...other}
            {...passProps}
          >
            <View />
          </Component>
          {children}
        </View>
      )
    }

    // 绝大部分情况会return这个
    Component = useRN ? RNTouchableOpacity : TouchableOpacity
    return (
      <Component style={style} activeOpacity={0.64} {...other} {...passProps}>
        {children}
      </Component>
    )
  }
)
