import { StyleSheet } from 'react-native'
import { IOS } from '@constants'
import { colorBorder } from '@styles'

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
          borderBottomColor: colorBorder,
          borderBottomWidth: StyleSheet.hairlineWidth
        },
    bottomTabBarSplitLine: {
      borderTopColor: colorBorder,
      borderTopWidth: StyleSheet.hairlineWidth
    }
  })
