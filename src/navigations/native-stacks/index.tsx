/*
 * @Author: czy0729
 * @Date: 2023-07-28 15:33:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-13 16:56:10
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { _, systemStore } from '@stores'
import { DEV, IOS } from '@constants'
import navigationsParams from '@/config'
import * as Screens from '@screens'
import { ColorValue } from '@types'
import BottomTabNavigator from '../bottom-tab-navigator'
import NavigationContainer from '../navigation-container'
import { getId, getOptions, useAutoHideSplashScreen } from './utils'
import { ANIMATIONS, DEFAULT_SCREEN_OPTIONS } from './ds'

const Stack = createNativeStackNavigator()

function Stacks({ isLoadingComplete }) {
  const isFullScreen = useAutoHideSplashScreen()
  const { initialRouteName, initialRouteParams } = navigationsParams

  return useObserver(() => {
    let navigationBarColor: ColorValue = _.colorPlain
    if (
      IOS ||
      isFullScreen ||
      (!IOS && systemStore.setting.androidBlur && systemStore.setting.blurBottomTabs && _.isDark)
    ) {
      navigationBarColor = 'transparent'
    }

    const screenOptions = {
      ...DEFAULT_SCREEN_OPTIONS,
      contentStyle: {
        backgroundColor: _.colorPlain
      },
      animation: ANIMATIONS[systemStore.setting.transition],
      navigationBarColor
    }

    /**
     * IOS 13 以上需要修改 plist 才能使用 react-navigation 的修改 statusbar 特性
     * 所以使用 react-native 的方式
     */
    if (!IOS) {
      // @ts-ignore
      screenOptions.statusBarStyle = _.select('dark', 'light')
    }

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions} initialRouteName={initialRouteName}>
          <Stack.Screen
            name='HomeTab'
            component={isLoadingComplete ? BottomTabNavigator : Placeholder}
          />
          {((DEV && initialRouteName !== 'HomeTab') || isLoadingComplete) &&
            Object.keys(Screens).map(name => (
              <Stack.Screen
                key={name}
                name={name}
                component={Screens[name]}
                initialParams={initialRouteName === name ? initialRouteParams : undefined}
                options={getOptions(name)}
                getId={getId}
              />
            ))}
        </Stack.Navigator>
      </NavigationContainer>
    )
  })
}

export default Stacks

function Placeholder() {
  return null
}
