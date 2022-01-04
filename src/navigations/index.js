/*
 * @Author: czy0729
 * @Date: 2019-03-29 10:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-04 10:46:34
 */
import React from 'react'
import {
  // createStackNavigator,
  getActiveChildNavigationOptions
} from 'react-navigation'
import createStackNavigator from '@components/@/react-navigation/createStackNavigator'
import createAppContainer from '@components/@/react-navigation/createAppContainer'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { observer } from 'mobx-react'
import * as Screens from '@screens'
import { systemStore } from '@stores'
import navigationsParams, { INIT_ROUTE } from '@/config'
import TabBarComponent from './tab-bar-component'
import config from './config'
import HomeScreen from './home-screen'
import { navigateOnce } from './utils'

export function createNavigator() {
  const routesMap = {}
  const { homeRenderTabs } = systemStore.setting
  homeRenderTabs.forEach(key => {
    routesMap[key] = key === 'Home' ? HomeScreen : Screens[key]
  })

  const HomeTab = observer(
    createBottomTabNavigator(routesMap, {
      initialRouteName: INIT_ROUTE,
      tabBarComponent: props => <TabBarComponent {...props} />,
      navigationOptions: ({ navigation, screenProps }) =>
        getActiveChildNavigationOptions(navigation, screenProps),
      animationEnabled: false
      // lazy: false
    })
  )

  const HomeStack = createStackNavigator(
    {
      ...Screens,
      HomeTab
    },
    {
      ...navigationsParams,
      ...config
    }
  )

  const MainNavigator = createAppContainer(HomeStack)
  MainNavigator.router.getStateForAction = navigateOnce(
    MainNavigator.router.getStateForAction
  )

  return <MainNavigator />
}
