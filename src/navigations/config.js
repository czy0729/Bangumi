/*
 * @Author: czy0729
 * @Date: 2019-04-24 18:50:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-10 02:30:02
 */
import { Platform, Easing, Animated } from 'react-native'
import StackViewStyleInterpolator from '@components/@/react-navigation-stack/StackViewStyleInterpolator'
import { _, systemStore } from '@stores'
import { IOS } from '@constants'

export const transitionSpecVertical = {
  duration: IOS ? 400 : 448,
  easing: Easing.bezier(0.35, 0.45, 0, 1),
  timing: Animated.timing,
  useNativeDriver: true
}
export const transitionSpecHorizontal = {
  duration: IOS ? 400 : 448,
  easing: Easing.out(Easing.poly(3)),
  timing: Animated.timing,
  useNativeDriver: true
}
export const transitionSpecHorizontalIsBack = {
  duration: IOS ? 480 : 500,
  easing: Easing.out(Easing.poly(3)),
  timing: Animated.timing,
  useNativeDriver: true
}

export default {
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
  },
  cardStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0)' // 覆盖掉 react-navigation-stack 强制使用 backgroundColor 的问题
  },
  transitionConfig: props => {
    const { transition } = systemStore.setting
    if (transition === 'vertical') {
      return {
        transitionSpec: transitionSpecVertical,
        screenInterpolator: StackViewStyleInterpolator.forVertical
      }
    }

    const scenes = props.scenes
    const lastSceneIndexInScenes = scenes.length - 1
    const isBack = !scenes[lastSceneIndexInScenes].isActive
    return {
      transitionSpec: isBack
        ? transitionSpecHorizontalIsBack
        : transitionSpecHorizontal,
      screenInterpolator: _.select(
        StackViewStyleInterpolator.forHorizontal,
        StackViewStyleInterpolator.forHorizontalWithoutStyles
      )
    }
  }
}
