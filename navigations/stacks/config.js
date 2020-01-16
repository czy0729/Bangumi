/*
 * @Author: czy0729
 * @Date: 2019-04-24 18:50:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-16 20:30:42
 */
import { Platform } from 'react-native'
import StackViewStyleInterpolator from '@components/@/react-navigation-stack/StackViewStyleInterpolator'
import { _, systemStore } from '@stores'
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
    },
    headerTitleAllowFontScaling: false,
    headerBackAllowFontScaling: false,
    transparentCard: true
  }
  // gestureEnabled: true // 安卓开启手势退后
}

if (!IOS) {
  config.transitionConfig = () => {
    if (systemStore.setting.transition === 'vertical') {
      return {
        screenInterpolator: StackViewStyleInterpolator.forFadeToBottomAndroid
      }
    }
    return {
      screenInterpolator: StackViewStyleInterpolator.forHorizontal
    }
  }
}

export default config
