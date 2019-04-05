import { StyleSheet } from 'react-native'
import { colorBorder } from '@styles'

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0)'
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
