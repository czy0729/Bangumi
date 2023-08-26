/*
 * @Author: czy0729
 * @Date: 2023-07-28 15:33:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-26 06:14:45
 */
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useObserver } from 'mobx-react'
import * as Screens from '@screens'
import { _, systemStore } from '@stores'
import { urlStringify } from '@utils'
import { DEV, IOS } from '@constants'
import { ColorValue } from '@types'
import navigationsParams from '@/config'
import NavigationContainer from '../navigation-container'
import BottomTabNavigator from '../bottom-tab-navigator'
import { useAutoHideSplashScreen } from './utils'
import { ANIMATIONS, DEFAULT_SCREEN_OPTIONS } from './ds'

const Stack = createNativeStackNavigator()

function Stacks({ isLoadingComplete }) {
  const isFullScreen = useAutoHideSplashScreen()
  const { initialRouteName, initialRouteParams } = navigationsParams

  return useObserver(() => {
    const { transition, androidBlur, blurBottomTabs } = systemStore.setting
    let navigationBarColor: ColorValue = _.colorPlain
    if (isFullScreen || (!IOS && androidBlur && blurBottomTabs && _.isDark)) {
      navigationBarColor = 'transparent'
    }

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            ...DEFAULT_SCREEN_OPTIONS,
            statusBarStyle: _.select('dark', 'light'),
            contentStyle: {
              backgroundColor: _.colorPlain
            },
            animation: ANIMATIONS[transition],
            navigationBarColor
          }}
          initialRouteName={initialRouteName}
        >
          <Stack.Screen
            name='HomeTab'
            component={isLoadingComplete ? BottomTabNavigator : Placeholder}
          />
          {((DEV && initialRouteName !== 'HomeTab') || isLoadingComplete) &&
            Object.keys(Screens).map(name => {
              let statusBarStyle: 'dark' | 'light' = _.select('dark', 'light')
              if (!_.isDark) {
                if (name === 'Subject' || name === 'User' || name === 'Zone') {
                  statusBarStyle = 'light'
                }
              }

              return (
                <Stack.Screen
                  key={name}
                  name={name}
                  component={Screens[name]}
                  initialParams={
                    initialRouteName === name ? initialRouteParams : undefined
                  }
                  options={{
                    statusBarStyle
                  }}
                  getId={({ params }) => (params ? urlStringify(params) : undefined)}
                />
              )
            })}
        </Stack.Navigator>
      </NavigationContainer>
    )
  })
}

export default Stacks

function Placeholder() {
  return null
}
