/*
 * @Author: czy0729
 * @Date: 2019-03-29 10:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-14 17:58:50
 */
import React from 'react'
import {
  createAppContainer,
  createStackNavigator,
  getActiveChildNavigationOptions
} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { observer } from 'mobx-react'
import * as Screens from '@screens'
import navigationsParams, { initialRouteName } from '@/config'
import TabBarComponent from './tab-bar-component'
import config from './config'
import HomeScreen from './home-screen'
import { navigateOnce } from './utils'

const HomeTab = observer(
  createBottomTabNavigator(
    {
      Discovery: Screens.Discovery,
      Timeline: Screens.Timeline,
      Home: HomeScreen,
      Rakuen: Screens.Rakuen,
      User: Screens.User
    },
    {
      initialRouteName,
      tabBarComponent: props => <TabBarComponent {...props} />,
      navigationOptions: ({ navigation, screenProps }) =>
        getActiveChildNavigationOptions(navigation, screenProps),
      animationEnabled: false
      // lazy: false
    }
  )
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

export default MainNavigator
