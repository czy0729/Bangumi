/*
 * @Author: czy0729
 * @Date: 2019-04-24 17:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-24 22:13:05
 */
import {
  createSwitchNavigator,
  getActiveChildNavigationOptions
} from 'react-navigation'
import { Home, Auth } from '@screens'

const HomeSwitch = createSwitchNavigator(
  {
    Auth,
    Home
  },
  {
    initialRouteName: 'Home'
  }
)

const HomeScreen = {
  screen: HomeSwitch,
  navigationOptions: ({ navigation, screenProps }) =>
    getActiveChildNavigationOptions(navigation, screenProps)
}

export default HomeScreen
