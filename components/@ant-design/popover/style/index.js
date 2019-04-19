/*
 * @Author: czy0729
 * @Date: 2019-04-14 21:27:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-14 21:28:24
 */
import { StyleSheet, Platform } from 'react-native'
import { colorPlain, colorShadow } from '@styles'

export default theme =>
  StyleSheet.create({
    popover: Platform.select({
      ios: {
        shadowColor: colorShadow,
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0.24,
        shadowRadius: 32
      }
    }),
    content: {
      padding: 0,
      backgroundColor: theme.fill_base,
      borderRadius: 8,
      elevation: 2,
      overflow: 'hidden'
    },
    arrow: {
      borderTopColor: colorPlain
    },
    arrowAndroid: {
      borderTopColor: 'transparent'
    },
    background: {
      backgroundColor: 'transparent'
    }
  })
