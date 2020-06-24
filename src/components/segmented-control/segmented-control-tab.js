/*
 * @Author: czy0729
 * @Date: 2020-06-24 16:48:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-24 21:21:15
 */
import * as React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Text from '../text'

export const SegmentedControlTab = ({
  onSelect,
  value,
  enabled,
  selected,
  tintColor,
  fontStyle = {},
  activeFontStyle = {}
}) => {
  const { color: textColor, fontSize, fontFamily } = fontStyle
  const {
    color: activeColor,
    fontSize: activeFontSize,
    fontFamily: activeFontFamily
  } = activeFontStyle

  const getColor = () => {
    if (textColor) {
      return textColor
    }
    if (tintColor) {
      return 'white'
    }
    return 'black'
  }
  const color = getColor()

  const activeStyle = {
    ...styles.activeText,
    fontFamily: activeFontFamily || fontFamily,
    fontSize: activeFontSize || fontSize,
    color: activeColor || color
  }

  // const idleStyle = {
  //   color,
  //   fontSize: fontSize || undefined,
  //   fontFamily: fontFamily || undefined
  // }

  return (
    <TouchableOpacity
      style={styles.container}
      disabled={!enabled}
      onPress={onSelect}
    >
      <View style={[styles.default]}>
        <Text type='title' bold={selected}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5
  },
  default: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 5
  },
  activeText: {
    fontWeight: 'bold'
  }
})
