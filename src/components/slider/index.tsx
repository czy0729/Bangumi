/*
 * @Author: czy0729
 * @Date: 2019-12-13 11:08:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-19 14:09:18
 */
import React from 'react'
import { Slider as RNSlider } from 'react-native'
import { observer } from 'mobx-react'
import { Props as SliderProps } from './types'

export { SliderProps }

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
  }: SliderProps) => (
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
)
