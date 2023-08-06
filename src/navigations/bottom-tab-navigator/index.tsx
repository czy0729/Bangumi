/*
 * @Author: czy0729
 * @Date: 2023-07-28 15:24:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-28 15:28:49
 */
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useObserver } from 'mobx-react-lite'
import { Discovery, Timeline, Home, Rakuen, User } from '@screens'
import { _, systemStore } from '@stores'
import TabBar from '../tab-bar'

const Tab = createBottomTabNavigator()
function BottomTabNavigator() {
  return useObserver(() => {
    const { homeRenderTabs, initialPage } = systemStore.setting
    const _initialPage = initialPage || ''
    const initialRouteName = homeRenderTabs.includes(_initialPage)
      ? _initialPage
      : 'Home'
    return (
      <Tab.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false
        }}
        // @ts-expect-error
        tabBar={props => <TabBar {...props} />}
      >
        {homeRenderTabs.includes('Discovery') && (
          <Tab.Screen name='Discovery' component={Discovery} />
        )}
        {homeRenderTabs.includes('Timeline') && (
          <Tab.Screen name='Timeline' component={Timeline} />
        )}
        <Tab.Screen name='Home' component={Home} />
        {homeRenderTabs.includes('Rakuen') && (
          <Tab.Screen name='Rakuen' component={Rakuen} />
        )}
        <Tab.Screen name='User' component={User} />
      </Tab.Navigator>
    )
  })
}

export default BottomTabNavigator
