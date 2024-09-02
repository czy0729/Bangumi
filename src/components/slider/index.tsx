/*
 * @Author: czy0729
 * @Date: 2019-12-13 11:08:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:55:41
 */
import React from 'react'
import { observer } from 'mobx-react'
import RNSlider from '@react-native-community/slider'
import { r } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { COMPONENT } from './ds'
import { Props as SliderProps } from './types'

export { SliderProps }

/** 滑动输入条 */
export const Slider = observer(
  ({
    defaultValue = 0,
    value,
    min,
    max,
    step,
    disabled = false,
    onChange = FROZEN_FN,
    onAfterChange = FROZEN_FN,
    maximumTrackTintColor,
    minimumTrackTintColor
  }: SliderProps) => {
    r(COMPONENT)

    return (
      <RNSlider
        value={defaultValue || value}
        minimumValue={min}
        maximumValue={max}
        step={step}
        minimumTrackTintColor={minimumTrackTintColor}
        maximumTrackTintColor={maximumTrackTintColor}
        disabled={disabled}
        tapToSeek
        onValueChange={onChange}
        onSlidingComplete={onAfterChange}
      />
    )
  }
)

export default Slider
