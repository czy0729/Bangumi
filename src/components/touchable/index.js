/*
 * 触摸反馈整合
 * @Author: czy0729
 * @Date: 2019-03-28 15:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-11 02:32:27
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
import { DEV, IOS } from '@constants'
import { defaultHitSlop, styles, callOnceInInterval, separateStyles } from './utils'

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
    ripple,
    onPress = Function.prototype,
    ...other
  }) => {
    /**
     * @tofixed 安卓开发环境热使用RNGH的组件会导致 GestureHandler already initialized 问题, 暂时规避
     */
    const _useRN = !IOS && DEV ? true : useRN
    const passProps = {
      hitSlop,
      delayPressIn,
      delayPressOut,
      onPress: delay ? () => callOnceInInterval(onPress) : onPress
    }
    if (withoutFeedback) {
      const Component = _useRN ? RNTouchableOpacity : TouchableOpacity
      return (
        <Component style={style} activeOpacity={1} {...other} {...passProps}>
          <View>{children}</View>
        </Component>
      )
    }

    const _ripple = ripple === undefined ? getSystemStoreAsync().setting.ripple : ripple
    if (!IOS && _ripple) {
      if (_useRN) {
        return (
          <View style={style}>
            <RNTouchableNativeFeedback {...other} {...passProps} delayPressIn={80}>
              <View style={styles.touchable} />
            </RNTouchableNativeFeedback>
            {children}
          </View>
        )
      }

      const _styles = separateStyles(style)
      return (
        <View style={_styles.containerStyle}>
          <TouchableNativeFeedback
            style={_styles.style}
            {...other}
            {...passProps}
            delayPressIn={80}
          >
            <View>{children}</View>
          </TouchableNativeFeedback>
        </View>
      )
    }

    if (highlight) {
      if (_useRN) {
        return (
          <View style={style}>
            <RNTouchableHighlight
              style={styles.touchable}
              activeOpacity={1}
              underlayColor={_.colorHighLight}
              {...other}
              {...passProps}
            >
              <View />
            </RNTouchableHighlight>
            {children}
          </View>
        )
      }

      return (
        <TouchableHighlight
          style={style}
          activeOpacity={1}
          underlayColor={_.colorHighLight}
          {...other}
          {...passProps}
        >
          <View>{children}</View>
        </TouchableHighlight>
      )
    }

    // 绝大部分情况会return这个
    const Component = _useRN ? RNTouchableOpacity : TouchableOpacity
    return (
      <Component style={style} activeOpacity={0.72} {...other} {...passProps}>
        {children}
      </Component>
    )
  }
)
