/*
 * 触摸反馈整合
 * 因封装前并未有<Pressable>，没必要前不会考虑重新整合
 * @Author: czy0729
 * @Date: 2019-03-28 15:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-03 21:02:09
 */
import React from 'react'
import {
  View,
  TouchableNativeFeedback as RNTouchableNativeFeedback,
  TouchableHighlight as RNTouchableHighlight,
  TouchableOpacity as RNTouchableOpacity,
  Insets
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
import { ViewStyle, ReactNode } from '@types'
import { defaultHitSlop, styles, callOnceInInterval, separateStyles } from './utils'

type Props = {
  style?: ViewStyle

  /** 是否无反馈效果 */
  withoutFeedback?: boolean

  /** 是否高亮反馈效果 */
  highlight?: boolean

  /** 是否防止快速多次点击 */
  delay?: boolean

  /** 设置元素能够检测到按压动作的额外距离 */
  hitSlop?: Insets

  /** 在 onPressOut 和 onPress 之前的时间 */
  delayPressIn?: number

  /** 松开手后的时间 */
  delayPressOut?: number

  /**
   * iOS 端此值无变化
   * 安卓端 <Touchable> 都使用了 react-native-gesture-handler 提供的封装
   * 有比 RN 提供的更快的反馈效果，若设置为 true 强制使用 RN 提供的 <Touchable>
   */
  useRN?: boolean

  /** 涟漪状的背景（安卓 only） */
  ripple?: boolean

  /** onPressOut 之后调用 */
  onPress?: (event?: any) => any

  onLongPress?: (event?: any) => any

  children?: ReactNode
}

export const Touchable = observer(
  ({
    style,
    withoutFeedback = false,
    highlight = false,
    delay = true,
    hitSlop = defaultHitSlop,
    delayPressIn = 0,
    delayPressOut = 0,
    useRN = false,
    ripple,
    onPress = () => {},
    children,
    ...other
  }: Props) => {
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
      // TouchableNativeFeedback 当 delayPressIn=0 时在安卓端触摸太快会触发涟漪, 需要延迟
      if (passProps.delayPressIn !== 0) passProps.delayPressIn = 80
      if (_useRN) {
        return (
          <View style={style}>
            <RNTouchableNativeFeedback {...other} {...passProps}>
              <View style={styles.touchable} />
            </RNTouchableNativeFeedback>
            {children}
          </View>
        )
      }

      const _styles = separateStyles(style)
      return (
        <View style={_styles.containerStyle}>
          <TouchableNativeFeedback style={_styles.style} {...other} {...passProps}>
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
