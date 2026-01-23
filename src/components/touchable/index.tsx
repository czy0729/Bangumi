/*
 * @Author: czy0729
 * @Date: 2019-03-28 15:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-24 07:15:16
 */
import React from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { useCallOnceInInterval } from './hooks'
import TouchableOpacity from './touchable-opacity'
import TouchableWithoutFeedback from './touchable-without-feedback'
import { defaultHitSlop } from './utils'
import { COMPONENT } from './ds'

import type { Props as TouchableProps } from './types'

export type { TouchableProps }
export type { TouchablePressEvent, TouchableHandlePress } from './types'

/**
 * 触摸反馈整合
 *  - 因封装前并未有官方的 Pressable，没必要前不会考虑重新整合
 */
export const Touchable = observer(
  ({
    style,
    withoutFeedback = false,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    highlight = false,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delay = true,
    hitSlop = defaultHitSlop,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delayPressIn = 0,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delayPressOut = 0,
    useRN = false,
    ripple,
    animate,
    scale,
    disabled,
    onPress = FROZEN_FN,
    children,
    ...other
  }: TouchableProps) => {
    r(COMPONENT)

    const { handleDisabled, handlePress } = useCallOnceInInterval(onPress)
    const passProps = {
      style,
      hitSlop,
      // delayPressIn,
      // delayPressOut,
      // extraButtonProps: _.select(EXTRA_BUTTON_PROPS, EXTRA_BUTTON_PROPS_DARK),
      disabled: disabled || handleDisabled,
      useRN,
      onPress: handlePress,
      children,
      ...other
    }

    if (withoutFeedback) return <TouchableWithoutFeedback {...passProps} />

    return <TouchableOpacity {...passProps} />
  }
)

export default Touchable
