/*
 * @Author: czy0729
 * @Date: 2023-07-28 15:39:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 12:56:02
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import * as SplashScreen from 'expo-splash-screen'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { systemStore } from '@stores'
import { urlStringify } from '@utils'
import { useMount } from '@utils/hooks'
import * as Screens from '@screens'
import navigationsParams from '@src/config'
import BottomTabNavigator from '../bottom-tab-navigator'
import NavigationContainer from '../navigation-container'

const defaultScreenOptions = {
  headerShown: false,
  cardStyle: {
    backgroundColor: 'transparent'
  }
}

const Stack = createStackNavigator()

/** @deprecated use NativeStack instead */
function Stacks() {
  const { initialRouteName, initialRouteParams } = navigationsParams
  useMount(() => {
    SplashScreen.hideAsync()
  })

  return useObserver(() => {
    const { transition } = systemStore.setting
    let transitionPresets = TransitionPresets.SlideFromRightIOS
    if (transition === 'vertical') {
      transitionPresets = TransitionPresets.FadeFromBottomAndroid
    } else if (transition === 'scale') {
      transitionPresets = TransitionPresets.ScaleFromCenterAndroid
    }

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            ...defaultScreenOptions,
            ...transitionPresets
          }}
          initialRouteName={initialRouteName}
        >
          <Stack.Screen name='HomeTab' getComponent={() => BottomTabNavigator} />
          {Object.keys(Screens).map(name => (
            <Stack.Screen
              key={name}
              name={name}
              getComponent={() => Screens[name]}
              initialParams={initialRouteName === name ? initialRouteParams : undefined}
              getId={({ params }) => (params ? urlStringify(params) : undefined)}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    )
  })
}

export default Stacks
