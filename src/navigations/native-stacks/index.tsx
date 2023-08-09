/*
 * @Author: czy0729
 * @Date: 2023-07-28 15:33:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-08 23:06:03
 */
import React from 'react'
import { StackAnimationTypes } from 'react-native-screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useObserver } from 'mobx-react'
import { StatusBar } from 'expo-status-bar'
import * as Screens from '@screens'
import { _, systemStore } from '@stores'
import { urlStringify } from '@utils'
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
  navigationBarColor: 'transparent',
  freezeOnBlur: false
}

const Stack = createNativeStackNavigator()
function Stacks({ isLoadingComplete }) {
  const { initialRouteName, initialRouteParams } = navigationsParams
  return useObserver(() => {
    const { transition } = systemStore.setting
    let animation: StackAnimationTypes = 'slide_from_right'
    if (transition === 'vertical') {
      animation = 'slide_from_bottom'
    } else if (transition === 'scale') {
      animation = 'default'
    }
    return (
      <>
        <StatusBar style={_.select('dark', 'light')} />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              ...defaultScreenOptions,
              contentStyle: {
                backgroundColor: _.colorPlain
              },
              animation
            }}
            initialRouteName={initialRouteName}
          >
            <Stack.Screen name='HomeTab' component={BottomTabNavigator} />
            {isLoadingComplete &&
              Object.keys(Screens).map(name => (
                <Stack.Screen
                  key={name}
                  name={name}
                  component={Screens[name]}
                  initialParams={
                    initialRouteName === name ? initialRouteParams : undefined
                  }
                  getId={({ params }) => (params ? urlStringify(params) : undefined)}
                />
              ))}
          </Stack.Navigator>
        </NavigationContainer>
      </>
    )
  })
}

export default Stacks
