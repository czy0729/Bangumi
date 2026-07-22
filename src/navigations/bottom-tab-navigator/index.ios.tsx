/*
 * iOS uses the system UITabBarController through React Navigation's native tabs.
 */
import React from 'react'
import { observer } from 'mobx-react'
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable'
import { systemStore, _ } from '@stores'
import { IOS_IPA } from '@src/config'
import { routesConfig } from '../tab-bar/config'
import LegacyBottomTabNavigator from './legacy'
import { shouldUseNativeTabs } from './should-use-native-tabs'
import { getInitialRouteName, getTabConfig } from './utils'

const Tab = createNativeBottomTabNavigator()

const SF_SYMBOLS = {
  Discovery: ['safari', 'safari.fill'],
  Timeline: ['clock', 'clock.fill'],
  Home: ['star', 'star.fill'],
  Rakuen: ['bubble.left.and.bubble.right', 'bubble.left.and.bubble.right.fill'],
  User: ['person.crop.circle', 'person.crop.circle.fill'],
  Tinygrail: ['trophy', 'trophy.fill']
} as const

function BottomTabNavigator() {
  const { homeRenderTabs, tinygrail: isTinygrailEnabled } = systemStore.setting
  const tabConfigs = getTabConfig(!!isTinygrailEnabled)
  const visibleTabConfigs = tabConfigs.filter(config => config.showCondition(homeRenderTabs))

  // Expo Go does not contain the native Tabs host. UIKit also moves the sixth tab into "More".
  if (!shouldUseNativeTabs(IOS_IPA, visibleTabConfigs.length)) {
    return <LegacyBottomTabNavigator />
  }

  return (
    <Tab.Navigator
      initialRouteName={getInitialRouteName()}
      screenOptions={({ route }) => {
        const symbols = SF_SYMBOLS[route.name as keyof typeof SF_SYMBOLS]

        return {
          headerShown: false,
          lazy: false,
          tabBarActiveTintColor: _.colorMain,
          tabBarControllerMode: 'tabBar',
          tabBarMinimizeBehavior: 'none',
          tabBarLabel: routesConfig[route.name]?.label || route.name,
          tabBarIcon: ({ focused }) => ({
            type: 'sfSymbol',
            name: symbols[focused ? 1 : 0]
          })
        }
      }}
    >
      {visibleTabConfigs.map(config => (
        <Tab.Screen
          key={config.name}
          name={config.name}
          component={config.component as React.ComponentType<any>}
          initialParams={config.initialParams}
        />
      ))}
    </Tab.Navigator>
  )
}

export default observer(BottomTabNavigator)
