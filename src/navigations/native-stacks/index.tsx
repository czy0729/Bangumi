/*
 * @Author: czy0729
 * @Date: 2023-07-28 15:33:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-03 21:58:28
 */
import React, { useCallback } from 'react'
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
  const { isFullScreen, hideSplashScreen } = useAutoHideSplashScreen()
  const { initialRouteName, initialRouteParams } = navigationsParams
  const isReady = isLoadingComplete && hideSplashScreen
  const handleGetComponent = useCallback(
    () => (isReady ? BottomTabNavigator : Placeholder),
    [isReady]
  )
  return useObserver(() => (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={getScreenOptions(isFullScreen)}
        initialRouteName={initialRouteName}
      >
        <Stack.Screen name='HomeTab' getComponent={handleGetComponent} />
        {(DEV && initialRouteName !== 'HomeTab') || isReady
          ? Object.keys(Screens).map(name => (
              <Stack.Screen
                key={name}
                name={name}
                getComponent={() => (isLoadingComplete ? Screens[name] : Placeholder)}
                initialParams={initialRouteName === name ? initialRouteParams : undefined}
                options={getOptions(name)}
                getId={getId}
              />
            ))
          : null}
      </Stack.Navigator>
    </NavigationContainer>
  ))
}

export default NativeStacks
