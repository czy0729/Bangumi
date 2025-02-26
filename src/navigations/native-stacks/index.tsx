/*
 * @Author: czy0729
 * @Date: 2023-07-28 15:33:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-25 17:23:30
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DEV } from '@constants'
import * as Screens from '@screens'
import navigationsParams from '@src/config'
import BottomTabNavigator from '../bottom-tab-navigator'
import NavigationContainer from '../navigation-container'
import { getId, getOptions, getScreenOptions, Placeholder, useAutoHideSplashScreen } from './utils'

const Stack = createNativeStackNavigator()

function NativeStacks({ isLoadingComplete }: { isLoadingComplete: boolean }) {
  const isFullScreen = useAutoHideSplashScreen()
  const { initialRouteName, initialRouteParams } = navigationsParams
  return useObserver(() => (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={getScreenOptions(isFullScreen)}
        initialRouteName={initialRouteName}
      >
        <Stack.Screen
          name='HomeTab'
          getComponent={() => (isLoadingComplete ? BottomTabNavigator : Placeholder)}
        />
        {((DEV && initialRouteName !== 'HomeTab') || isLoadingComplete) &&
          Object.keys(Screens).map(name => (
            <Stack.Screen
              key={name}
              name={name}
              getComponent={() => (isLoadingComplete ? Screens[name] : Placeholder)}
              initialParams={initialRouteName === name ? initialRouteParams : undefined}
              options={getOptions(name)}
              getId={getId}
            />
          ))}
      </Stack.Navigator>
    </NavigationContainer>
  ))
}

export default NativeStacks
