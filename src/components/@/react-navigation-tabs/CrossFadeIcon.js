/*
 * @Author: czy0729
 * @Date: 2021-01-15 10:00:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-15 10:01:30
 */
import React from 'react'
import { Animated, View, StyleSheet } from 'react-native'

function TabBarIcon({
  route,
  activeOpacity,
  inactiveOpacity,
  activeTintColor,
  inactiveTintColor,
  renderIcon,
  horizontal,
  style
}) {
  // We render the icon twice at the same position on top of each other:
  // active and inactive one, so we can fade between them.
  return (
    <View style={style}>
      <Animated.View style={[styles.icon, { opacity: activeOpacity }]}>
        {renderIcon({
          route,
          focused: true,
          horizontal,
          tintColor: activeTintColor
        })}
      </Animated.View>
      <Animated.View style={[styles.icon, { opacity: inactiveOpacity }]}>
        {renderIcon({
          route,
          focused: false,
          horizontal,
          tintColor: inactiveTintColor
        })}
      </Animated.View>
    </View>
  )
}

export default TabBarIcon

const styles = StyleSheet.create({
  icon: {
    // We render the icon twice at the same position on top of each other:
    // active and inactive one, so we can fade between them:
    // Cover the whole iconContainer:
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    // Workaround for react-native >= 0.54 layout bug
    minWidth: 25
  }
})
