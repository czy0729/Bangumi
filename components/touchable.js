/*
 * @Author: czy0729
 * @Date: 2019-03-28 15:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-29 07:14:16
 */
import React from 'react'
import {
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native'
import { colorBg } from '@styles'

const Touchable = ({
  style,
  withoutFeedback,
  highlight,
  children,
  ...other
}) => {
  if (withoutFeedback) {
    return (
      <TouchableOpacity style={style} activeOpacity={1} {...other}>
        {children}
      </TouchableOpacity>
    )
  }
  if (Platform.OS === 'ios') {
    if (highlight) {
      return (
        <TouchableHighlight
          style={style}
          activeOpacity={1}
          underlayColor={colorBg}
          {...other}
        >
          {children}
        </TouchableHighlight>
      )
    }
    return (
      <TouchableOpacity style={style} activeOpacity={0.64} {...other}>
        {children}
      </TouchableOpacity>
    )
  }
  return (
    <TouchableNativeFeedback style={style} {...other}>
      {children}
    </TouchableNativeFeedback>
  )
}

Touchable.defaultProps = {
  withoutFeedback: false,
  highlight: false
}

export default Touchable
