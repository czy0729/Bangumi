/*
 * @Author: czy0729
 * @Date: 2019-03-29 10:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-25 13:20:07
 */
import React from 'react'
import { createAppContainer, createDrawerNavigator } from 'react-navigation'
import { Image } from '@components'
import Drawer from '@screens/_/drawer'
import { colorMain } from '@styles'
import HomeStack from './stacks/home'
import CalendarStack from './stacks/calendar'

export default createAppContainer(
  createDrawerNavigator(
    {
      Home: {
        screen: HomeStack,
        navigationOptions: {
          drawerLabel: '主页',
          drawerIcon: ({ tintColor }) => (
            <Image
              size={20}
              placeholder={false}
              src={
                tintColor === colorMain
                  ? require('@assets/images/icon/home-active.png')
                  : require('@assets/images/icon/home.png')
              }
            />
          )
        }
      },
      Calendar: {
        screen: CalendarStack,
        navigationOptions: {
          drawerLabel: '每日放送',
          drawerIcon: ({ tintColor }) => (
            <Image
              size={20}
              placeholder={false}
              src={
                tintColor === colorMain
                  ? require('@assets/images/icon/calendar-active.png')
                  : require('@assets/images/icon/calendar.png')
              }
            />
          )
        }
      },
      Calendar2: {
        screen: CalendarStack,
        navigationOptions: {
          drawerLabel: '时光机',
          drawerIcon: ({ tintColor }) => (
            <Image
              size={20}
              placeholder={false}
              src={
                tintColor === colorMain
                  ? require('@assets/images/icon/compass-active.png')
                  : require('@assets/images/icon/compass.png')
              }
            />
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
