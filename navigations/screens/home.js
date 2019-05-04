/*
 * @Author: czy0729
 * @Date: 2019-04-24 17:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-29 18:43:59
 */
import React from 'react'
import {
  createSwitchNavigator,
  getActiveChildNavigationOptions
} from 'react-navigation'
import { Home, Auth } from '@screens'
import { IconTabBar } from '@screens/_'

const HomeSwitch = createSwitchNavigator(
  {
    Auth,
    Home
  },
  {
    initialRouteName: 'Auth',

    // @notice 下面是防止首屏不是进度的时候, tabBar没配置
    defaultNavigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <IconTabBar name='heart' tintColor={tintColor} />
      ),
      tabBarLabel: '进度'
    }
  }
)

const HomeScreen = {
  screen: HomeSwitch,
  navigationOptions: ({ navigation, screenProps }) =>
    getActiveChildNavigationOptions(navigation, screenProps)
}

export default HomeScreen

// navigationOptions: {
//   headerTitle: '进度',
//   tabBarIcon: ({ tintColor }) => (
//     <Image
//       size={22}
//       placeholder={false}
//       src={
//         tintColor === colorMain
//           ? require('@assets/images/icon/heart-active.png')
//           : require('@assets/images/icon/heart.png')
//       }
//     />
//   ),
//   tabBarLabel: '进度'
// }
