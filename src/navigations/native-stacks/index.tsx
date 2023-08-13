/*
 * @Author: czy0729
 * @Date: 2023-07-28 15:33:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-13 22:39:04
 */
import React from 'react'
import { StackAnimationTypes } from 'react-native-screens'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useObserver } from 'mobx-react'
import * as Screens from '@screens'
import { _, systemStore } from '@stores'
import { urlStringify } from '@utils'
import { IOS } from '@constants'
import { ColorValue } from '@types'
import navigationsParams from '@/config'
import NavigationContainer from '../navigation-container'
import BottomTabNavigator from '../bottom-tab-navigator'

const defaultScreenOptions = {
  statusBarColor: 'transparent',
  headerShown: false,
  headerShadowVisible: false,
  cardStyle: {
    backgroundColor: 'transparent',
    elevation: 0
  },
  freezeOnBlur: false
}

const Stack = createNativeStackNavigator()
function Stacks({ isLoadingComplete }) {
  const { bottom } = useSafeAreaInsets()
  const { initialRouteName, initialRouteParams } = navigationsParams
  return useObserver(() => {
    const { transition, androidBlur, blurBottomTabs } = systemStore.setting
    let animation: StackAnimationTypes = 'slide_from_right'
    if (transition === 'vertical') {
      animation = 'slide_from_bottom'
    } else if (transition === 'scale') {
      animation = 'default'
    }

    /** 是否全面屏 */
    const isFullScreen = bottom <= 20
    let navigationBarColor: ColorValue = _.colorPlain
    if (isFullScreen || (!IOS && androidBlur && blurBottomTabs && _.isDark)) {
      navigationBarColor = 'transparent'
    }

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            ...defaultScreenOptions,
            statusBarStyle: _.select('dark', 'light'),
            contentStyle: {
              backgroundColor: _.colorPlain
            },
            navigationBarColor,
            animation
          }}
          initialRouteName={initialRouteName}
        >
          <Stack.Screen name='HomeTab' component={BottomTabNavigator} />
          {isLoadingComplete &&
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
