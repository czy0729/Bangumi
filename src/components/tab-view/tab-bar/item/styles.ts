/*
 * @Author: czy0729
 * @Date: 2026-11-21 03:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-21 03:00:00
 */
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  icon: {
    margin: 2
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    minHeight: 48
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  pressable: {
    // The label is not pressable on Windows
    // Adding backgroundColor: 'transparent' seems to fix it
    backgroundColor: 'transparent'
  }
})
