import { StyleSheet } from 'react-native'
import { colorBorder } from '@styles'

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent'
    },
    topTabBarSplitLine: {
      borderBottomWidth: 0
    },
    bottomTabBarSplitLine: {
      borderTopColor: colorBorder,
      borderTopWidth: StyleSheet.hairlineWidth
    }
  })
