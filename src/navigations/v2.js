/*
 * @Author: czy0729
 * @Date: 2019-03-29 10:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-04 15:34:33
 */
import React from 'react'
import {
  createAppContainer,
  createStackNavigator,
  getActiveChildNavigationOptions
} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { observer } from 'mobx-react'
import navigationsParams, { initialHomeTabName } from '../navigations'
import TabBarComponent from './tab-bar-component'
import HomeScreen from './screens/home'
import config from './stacks/config'

const HomeTab = observer(
  createBottomTabNavigator(
    {
      // Discovery,
      // Timeline,
      Home: HomeScreen
      // Rakuen,
      // User
    },
    {
      initialRouteName: initialHomeTabName,
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
    HomeTab
  },
  {
    ...navigationsParams,
    ...config
  }
)

export default createAppContainer(HomeStack)
