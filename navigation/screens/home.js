/*
 * @Author: czy0729
 * @Date: 2019-04-24 17:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-25 13:26:55
 */
import React from 'react'
import { createSwitchNavigator } from 'react-navigation'
import { Image } from '@components'
import { Home, Auth } from '@screens'
import { colorMain } from '@styles'

const HomeSwitch = createSwitchNavigator(
  {
    Auth,
    Home
  },
  {
    initialRouteName: 'Auth'
  }
)

const HomeScreen = {
  screen: HomeSwitch,
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <Image
        size={22}
        placeholder={false}
        src={
          tintColor === colorMain
            ? require('@assets/images/icon/heart-active.png')
            : require('@assets/images/icon/heart.png')
        }
      />
    ),
    tabBarLabel: '进度'
  }
}

export default HomeScreen
