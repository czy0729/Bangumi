/*
 * 触摸反馈整合 (因封装前并未有官方的 Pressable，没必要前不会考虑重新整合)
 * @Author: czy0729
 * @Date: 2019-03-28 15:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-25 18:00:09
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { STORYBOOK } from '@constants'
import TouchableWithoutFeedback from './touchable-without-feedback'
import TouchableHighlight from './touchable-highlight'
import TouchableOpacity from './touchable-opacity'
import TouchableAnimated from './touchable-animated'
import { defaultHitSlop, callOnceInInterval } from './utils'
import { EXTRA_BUTTON_PROPS, EXTRA_BUTTON_PROPS_DARK } from './ds'
import { Props as TouchableProps } from './types'

export { TouchableProps }

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
    animate,
    scale,
    onPress = () => {},
    children,
    ...other
  }: TouchableProps) => {
    const passProps = {
      useRN,
      style,
      hitSlop,
      delayPressIn,
      delayPressOut,
      extraButtonProps: _.select(EXTRA_BUTTON_PROPS, EXTRA_BUTTON_PROPS_DARK),
      onPress: delay ? () => callOnceInInterval(onPress) : onPress,
      children,
      ...other
    }
    if (STORYBOOK) passProps.useRN = true

    if (withoutFeedback) return <TouchableWithoutFeedback {...passProps} />

    if (highlight) return <TouchableHighlight {...passProps} />

    if (!STORYBOOK && !useRN && animate)
      return <TouchableAnimated {...passProps} scale={scale} />

    // 绝大部分情况会 return 这个
    return <TouchableOpacity {...passProps} />
  }
)
