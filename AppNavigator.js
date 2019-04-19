/*
 * @Author: czy0729
 * @Date: 2019-03-29 10:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-15 10:32:56
 */
import React from 'react'
import { Platform } from 'react-native'
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation'
import { Constants } from 'expo'
import { Icon } from '@components'
import {
  Auth,
  Home,
  Login,
  Calendar,
  Settings,
  Subject,
  Timeline
} from '@screens'
import { wind, colorMain, colorTitle } from '@styles'

const HomeSwitch = createSwitchNavigator({
  Auth,
  Home
})

const NavBottomTab = createBottomTabNavigator(
  {
    Timeline: {
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='ios-list' size={26} style={{ color: tintColor }} />
        ),
        tabBarLabel: '时间胶囊'
      },
      screen: Timeline
    },
    Home: {
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='ios-heart-empty' size={26} style={{ color: tintColor }} />
        ),
        tabBarLabel: '进度'
      },
      screen: HomeSwitch
    },
    Calendar: {
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='ios-calendar' size={26} style={{ color: tintColor }} />
        ),
        tabBarLabel: '发现'
      },
      screen: Calendar
    },
    Settings: {
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='ios-timer' size={26} style={{ color: tintColor }} />
        ),
        tabBarLabel: '时光机'
      },
      screen: Settings
    }
  },
  {
    initialRouteName: 'Timeline',
    navigationOptions: {
      title: 'Bangumi'
    },
    tabBarOptions: {
      activeTintColor: colorMain,
      ...Platform.select({
        android: { headerStyle: { marginTop: -Constants.statusBarHeight } }
      })
    }
  }
)

export default createAppContainer(
  createStackNavigator(
    {
      Subject,
      Login,
      NavBottomTab
    },
    {
      initialRouteName: 'NavBottomTab',
      initialRouteParams: {
        // 评论数 [43]248175 [6]204135 [1]18007 [0]273437
        subjectId: 204135
      },
      headerMode: 'screen',
      headerBackTitleVisible: false,
      headerTransitionPreset: 'uikit',
      defaultNavigationOptions: {
        headerTintColor: colorTitle,
        headerLeftContainerStyle: Platform.select({
          ios: {
            paddingLeft: 8
          }
        }),
        headerTitleStyle: Platform.select({
          android: {
            marginLeft: -4
          }
        }),
        headerRightContainerStyle: {
          paddingRight: wind
        }
      }
    }
  )
)
