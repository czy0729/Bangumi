/*
 * @Author: czy0729
 * @Date: 2019-04-26 20:28:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-26 20:37:48
 */
import { createStackNavigator } from 'react-navigation'
import { Subject } from '@screens'
import UserScreen from '../screens/user'
import config from './config'

const UserStack = createStackNavigator(
  {
    User: UserScreen,
    Subject
  },
  {
    initialRouteName: 'User',
    ...config
  }
)

export default UserStack
