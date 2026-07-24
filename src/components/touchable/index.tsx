/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Author: czy0729
 * @Date: 2019-03-28 15:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 05:59:56
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
    highlight = false,
    delay = true,
    hitSlop = defaultHitSlop,
    delayPressIn = 0,
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

    if (withoutFeedback) {
      return (
        <TouchableWithoutFeedback
          style={style}
          hitSlop={hitSlop}
          disabled={disabled || handleDisabled}
          useRN={useRN}
          onPress={handlePress}
          {...other}
        >
          {children}
        </TouchableWithoutFeedback>
      )
    }

    return (
      <TouchableOpacity
        style={style}
        hitSlop={hitSlop}
        disabled={disabled || handleDisabled}
        useRN={useRN}
        onPress={handlePress}
        {...other}
      >
        {children}
      </TouchableOpacity>
    )
  }
)

export default Touchable
