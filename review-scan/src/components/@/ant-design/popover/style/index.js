/*
 * @Author: czy0729
 * @Date: 2019-04-14 21:27:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-04 02:52:12
 */
import { StyleSheet, Platform } from 'react-native'
import _ from '@styles'

export default theme =>
  StyleSheet.create({
    popover: Platform.select({
      ios: {
        shadowColor: _.colorShadow,
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0.24,
        shadowRadius: 32
      }
    }),
    content: {
      padding: 0,
      backgroundColor: _.colorPlain,
      borderRadius: 8,
      elevation: 2,
      overflow: 'hidden'
    },
    arrow: {
      borderTopColor: _.colorPlain
    },
    arrowAndroid: {
      borderTopColor: 'transparent'
    },
    background: {
      backgroundColor: 'transparent'
    }
  })
