/*
 * @Author: czy0729
 * @Date: 2019-04-24 18:50:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-20 16:41:55
 */
import { Platform } from 'react-native'
import StackViewStyleInterpolator from '@components/@/react-navigation-stack/StackViewStyleInterpolator'
import { _ } from '@stores'
import { IOS } from '@constants'

const config = {
  headerMode: 'screen',
  headerBackTitleVisible: false,
  headerTransitionPreset: 'uikit',
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerStyle: {
      borderBottomWidth: _.hairlineWidth,
      borderBottomColor: _.colorBorder
    },
    headerTintColor: _.colorTitle,
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
      paddingRight: _.wind
    }
  },
  gestureEnabled: true // 安卓开启手势退后
}

if (!IOS) {
  config.transitionConfig = () => ({
    screenInterpolator: StackViewStyleInterpolator.forHorizontal
  })
}

export default config
