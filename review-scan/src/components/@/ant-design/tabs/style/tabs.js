/*
 * @Author: czy0729
 * @Date: 2020-03-07 15:29:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-09 22:20:46
 */
import { StyleSheet } from 'react-native'
import _ from '@styles'

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent'
    },
    topTabBarSplitLine: {
      borderBottomWidth: 0,
      backgroundColor: 'transparent'
    },
    bottomTabBarSplitLine: {
      borderTopColor: _.colorBorder,
      borderTopWidth: StyleSheet.hairlineWidth
    }
  })
