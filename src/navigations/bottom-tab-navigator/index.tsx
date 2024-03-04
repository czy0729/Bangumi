/*
 * @Author: czy0729
 * @Date: 2023-07-28 15:24:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-04 18:03:35
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { _, systemStore } from '@stores'
import { Discovery, Home, Rakuen, Timeline, Tinygrail, User } from '@screens'
import { getInitialRouteName, renderTabBar } from './utils'
import { DEFAULT_SCREEN_OPTIONS } from './ds'

const Tab = createBottomTabNavigator()

function BottomTabNavigator() {
  return useObserver(() => {
    const { homeRenderTabs, tinygrail } = systemStore.setting
    return (
      <Tab.Navigator
        initialRouteName={getInitialRouteName()}
        screenOptions={DEFAULT_SCREEN_OPTIONS}
        sceneContainerStyle={{
          backgroundColor: _.colorPlain
        }}
        tabBar={renderTabBar}
      >
        {homeRenderTabs.includes('Discovery') && (
          <Tab.Screen name='Discovery' component={Discovery} />
        )}
        {homeRenderTabs.includes('Timeline') && <Tab.Screen name='Timeline' component={Timeline} />}
        <Tab.Screen name='Home' component={Home} />
        {homeRenderTabs.includes('Rakuen') && <Tab.Screen name='Rakuen' component={Rakuen} />}
        <Tab.Screen name='User' component={User} />
        {homeRenderTabs.includes('Tinygrail') && tinygrail && (
          <Tab.Screen
            name='Tinygrail'
            component={Tinygrail}
            initialParams={{
              fromBottomTab: true
            }}
          />
        )}
      </Tab.Navigator>
    )
  })
}

export default BottomTabNavigator
