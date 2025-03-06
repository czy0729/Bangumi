/*
 * @Author: czy0729
 * @Date: 2023-07-28 15:24:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-06 18:02:19
 */
import React, { useMemo } from 'react'
import { useObserver } from 'mobx-react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { systemStore } from '@stores'
import { getInitialRouteName, getTabConfig, renderTabBar } from './utils'
import { DEFAULT_SCREEN_OPTIONS } from './ds'
import { memoStyles } from './styles'

const Tab = createBottomTabNavigator()

function BottomTabNavigator() {
  return useObserver(() => {
    const styles = memoStyles()
    const { homeRenderTabs, tinygrail: isTinygrailEnabled, bottomTabLazy } = systemStore.setting
    const tabConfigs = useMemo(() => getTabConfig(!!isTinygrailEnabled), [isTinygrailEnabled])
    return (
      <Tab.Navigator
        initialRouteName={getInitialRouteName()}
        screenOptions={
          bottomTabLazy
            ? DEFAULT_SCREEN_OPTIONS
            : {
                ...DEFAULT_SCREEN_OPTIONS,
                lazy: false
              }
        }
        sceneContainerStyle={styles.sceneContainerStyle}
        tabBar={renderTabBar}
      >
        {tabConfigs.map(config => {
          if (!config.showCondition(homeRenderTabs)) return null

          return (
            <Tab.Screen
              key={config.name}
              name={config.name}
              component={config.component}
              initialParams={config.initialParams}
            />
          )
        })}
      </Tab.Navigator>
    )
  })
}

export default BottomTabNavigator
