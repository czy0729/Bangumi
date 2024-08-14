/*
 * @Author: czy0729
 * @Date: 2024-08-14 07:29:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-14 07:40:40
 */
import React from 'react'
import A from '../a'

export function a({
  key,
  attrs,
  passProps,
  defaultBaseFontStyle,
  baseFontStyle,
  maxWidth,
  onPress,
  children
}) {
  return (
    <A
      key={key}
      style={{
        ...defaultBaseFontStyle,
        ...baseFontStyle,
        maxWidth
      }}
      attrs={attrs}
      passProps={passProps}
      onPress={onPress}
    >
      {children}
    </A>
  )
}
