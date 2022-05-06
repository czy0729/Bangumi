/*
 * @Author: czy0729
 * @Date: 2019-12-13 11:08:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-06 17:20:18
 */
import React from 'react'
import { Slider as RNSlider, SliderProps } from 'react-native'
import { observer } from 'mobx-react'

type Props = SliderProps & {
  /** SliderProps.value */
  defaultValue?: number

  /** SliderProps.minimumValue */
  min?: number

  /** SliderProps.maximumValue */
  max?: number

  /** SliderProps.onValueChange */
  onChange?: (value?: any) => any

  /** SliderProps.onSlidingComplete */
  onAfterChange?: (value?: any) => any
}

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
  }: Props) => (
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
