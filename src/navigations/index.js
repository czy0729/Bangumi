/*
 * @Author: czy0729
 * @Date: 2022-03-09 23:39:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 21:12:24
 */
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useObserver } from 'mobx-react-lite'
import * as Screens from '@screens'
import { systemStore } from '@stores'
import { urlStringify } from '@utils'
import navigationsParams from '@/config'
import TabBar from './tab-bar'

export const SCREENS_TOTAL = Object.keys(Screens).length

const defaultScreenOptions = {
  headerShown: false,
  // cardStyleInterpolator: forHorizontalIOS,
  cardStyle: {
    backgroundColor: 'transparent'
  },
  ...TransitionPresets.SlideFromRightIOS
}

const Tab = createBottomTabNavigator()
function BottomTabNavigator() {
  return useObserver(() => {
    const { homeRenderTabs } = systemStore.setting
    return (
      <Tab.Navigator initialRouteName='Home' tabBar={props => <TabBar {...props} />}>
        {homeRenderTabs.includes('Discovery') && (
          <Tab.Screen name='Discovery' component={Screens.Discovery} />
        )}
        {homeRenderTabs.includes('Timeline') && (
          <Tab.Screen name='Timeline' component={Screens.Timeline} />
        )}
        <Tab.Screen name='Home' component={Screens.Home} />
        {homeRenderTabs.includes('Rakuen') && (
          <Tab.Screen name='Rakuen' component={Screens.Rakuen} />
        )}
        <Tab.Screen name='User' component={Screens.User} />
      </Tab.Navigator>
    )
  })
}

const Stack = createStackNavigator()
function Stacks() {
  const { initialRouteName, initialRouteParams } = navigationsParams
  return (
    <Stack.Navigator
      screenOptions={defaultScreenOptions}
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
  )
}

export default Stacks
