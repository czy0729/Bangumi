/*
 * @Author: czy0729
 * @Date: 2019-04-24 18:50:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-14 10:50:53
 */
import { Platform, Easing, Animated } from 'react-native'
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
    // gesturesEnabled: true
  }
}

if (!IOS) {
  const transitionSpec = {
    duration: 448,
    // easing: Easing.out(Easing.poly(3)),
    easing: Easing.bezier(0.35, 0.45, 0, 1),
    timing: Animated.timing,
    useNativeDriver: true
  }
  config.transitionConfig = () => {
    const { transition } = systemStore.setting
    if (transition === 'vertical') {
      return {
        transitionSpec,
        screenInterpolator: StackViewStyleInterpolator.forVertical
      }
    }
    return {
      transitionSpec,
      screenInterpolator: StackViewStyleInterpolator.forHorizontal
    }
  }
}

export default config
