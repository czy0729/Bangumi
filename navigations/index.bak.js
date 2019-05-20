/*
 * @Author: czy0729
 * @Date: 2019-03-29 10:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-10 19:37:35
 */
import React from 'react'
import { createAppContainer, createDrawerNavigator } from 'react-navigation'
import { Login } from '@screens'
import { Drawer, IconDrawer } from '@screens/_'
import HomeStack from './stacks/home'
import CalendarStack from './stacks/calendar'
import UserStack from './stacks/user'

export default createAppContainer(
  createDrawerNavigator(
    {
      Home: {
        screen: HomeStack,
        navigationOptions: {
          drawerLabel: '主页',
          drawerIcon: ({ tintColor }) => (
            <IconDrawer name='star' color={tintColor} />
          )
        }
      },
      Calendar: {
        screen: CalendarStack,
        navigationOptions: {
          drawerLabel: '每日放送',
          drawerIcon: ({ tintColor }) => (
            <IconDrawer name='calendar' color={tintColor} />
          )
        }
      },
      User: {
        screen: UserStack,
        navigationOptions: {
          drawerLabel: '时光机',
          drawerIcon: ({ tintColor }) => (
            <IconDrawer name='planet' color={tintColor} />
          )
        }
      },
      Login: {
        screen: Login,
        navigationOptions: {
          drawerLabel: '登陆',
          drawerIcon: ({ tintColor }) => (
            <IconDrawer name='planet' color={tintColor} />
          )
        }
      }
    },
    {
      initialRouteName: 'Home',
      contentComponent: props => <Drawer {...props} />
    }
  )
)
