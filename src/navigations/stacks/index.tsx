/*
 * @Author: czy0729
 * @Date: 2023-07-28 15:39:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-28 19:24:52
 */
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { useObserver } from 'mobx-react-lite'
import * as Screens from '@screens'
import { systemStore } from '@stores'
import { urlStringify } from '@utils'
import navigationsParams from '@/config'
import NavigationContainer from '../navigation-container'
import BottomTabNavigator from '../bottom-tab-navigator'

const defaultScreenOptions = {
  headerShown: false,
  cardStyle: {
    backgroundColor: 'transparent'
  }
}

const Stack = createStackNavigator()
function Stacks() {
  const { initialRouteName, initialRouteParams } = navigationsParams
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
          <Stack.Screen name='HomeTab' component={BottomTabNavigator} />
          {Object.keys(Screens).map(name => (
            <Stack.Screen
              key={name}
              name={name}
              component={Screens[name]}
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
