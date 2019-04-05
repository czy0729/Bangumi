/*
 * @Author: czy0729
 * @Date: 2019-03-29 10:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-06 04:58:50
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
import { Auth, Home, Login, Calendar, Settings, Subject } from '@screens'
import { Logo } from '@screens/_'
import { wind, colorMain, colorTitle, colorBorder } from '@styles'

const HomeSwitch = createSwitchNavigator({
  Auth,
  Home
})

const NavBottomTab = createBottomTabNavigator(
  {
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
    navigationOptions: {
      headerTitle: <Logo />,
      headerStyle: {
        borderBottomColor: colorBorder
      }
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
      initialRouteName: 'Subject',
      initialRouteParams: {
        subjectId: 248175
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
        headerRightContainerStyle: {
          paddingRight: wind
        }
      }
    }
  )
)
