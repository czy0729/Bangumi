/*
 * @Author: czy0729
 * @Date: 2019-09-22 02:09:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 18:07:04
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import Expand from './expand'
import Head from './head'
import List from './list'
import { COMPONENT } from './ds'

function Users() {
  return (
    <View style={_.container.inner}>
      <Head />
      <List />
      <Expand />
    </View>
  )
}

export default ob(Users, COMPONENT)
