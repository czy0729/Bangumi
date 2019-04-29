/*
 * @Author: czy0729
 * @Date: 2019-04-26 20:29:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-26 20:31:29
 */
import React from 'react'
import { User } from '@screens'
import { IconMenu } from '@screens/_'

const UserScreen = {
  screen: User,
  navigationOptions: ({ navigation }) => ({
    title: '时光机',
    headerLeft: () => <IconMenu navigation={navigation} />
  })
}

export default UserScreen
