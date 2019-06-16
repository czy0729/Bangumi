/*
 * @Author: czy0729
 * @Date: 2019-04-24 18:50:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-17 00:33:26
 */
import { StyleSheet, Platform } from 'react-native'
import { IOS } from '@constants'
import { wind, colorTitle, colorBorder } from '@styles'
import StackViewStyleInterpolator from './StackViewStyleInterpolator'

const config = {
  headerMode: 'screen',
  headerBackTitleVisible: false,
  headerTransitionPreset: 'uikit',
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerStyle: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colorBorder
    },
    headerTintColor: colorTitle,
    headerLeftContainerStyle: Platform.select({
      ios: {
        paddingLeft: 8
      }
    }),
    headerTitleStyle: Platform.select({
      android: {
        marginLeft: -4
      }
    }),
    headerRightContainerStyle: {
      paddingRight: wind
    }
  }
}

if (!IOS) {
  config.transitionConfig = () => ({
    screenInterpolator: StackViewStyleInterpolator.forHorizontal
  })
}

export default config
