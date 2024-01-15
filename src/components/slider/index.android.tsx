/*
 * @Author: czy0729
 * @Date: 2019-12-13 11:08:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:25:49
 */
import React from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
// @ts-ignore
import RNSlider from '@react-native-community/slider'
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
    onChange = () => {},
    onAfterChange = () => {},
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
        onValueChange={onChange}
        onSlidingComplete={onAfterChange}
      />
    )
  }
)
