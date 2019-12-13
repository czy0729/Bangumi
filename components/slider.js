/*
 * @Author: czy0729
 * @Date: 2019-12-13 11:08:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-13 11:18:48
 */
import React from 'react'
import { Slider as RNSlider } from 'react-native'

function Slider({
  defaultValue,
  value,
  min,
  max,
  step,
  disabled,
  onChange,
  onAfterChange,
  maximumTrackTintColor,
  minimumTrackTintColor
}) {
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

Slider.defaultProps = {
  defaultValue: 0,
  disabled: false,
  onChange: Function.prototype,
  onAfterChange: Function.prototype
}

export default Slider
