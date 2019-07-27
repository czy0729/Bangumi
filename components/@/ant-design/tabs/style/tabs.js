import { StyleSheet } from 'react-native'
import { colorBorder } from '@styles'

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent'
    },
    topTabBarSplitLine: {
      borderBottomColor: colorBorder,
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    bottomTabBarSplitLine: {
      borderTopColor: colorBorder,
      borderTopWidth: StyleSheet.hairlineWidth
    }
  })
