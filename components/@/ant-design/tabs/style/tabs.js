/*
 * @Author: czy0729
 * @Date: 2020-03-07 15:29:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-07 15:30:42
 */
import { StyleSheet } from 'react-native'
import { IOS } from '@constants'
import _ from '@styles'

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent'
    },
    topTabBarSplitLine: IOS
      ? {
          borderBottomWidth: 0
        }
      : {
          borderBottomColor: _.colorBorder,
          borderBottomWidth: StyleSheet.hairlineWidth
        },
    bottomTabBarSplitLine: {
      borderTopColor: _.colorBorder,
      borderTopWidth: StyleSheet.hairlineWidth
    }
  })
