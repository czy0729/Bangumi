/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:06:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 17:00:04
 */
import React from 'react'
import { View } from 'react-native'
import { obc } from '@utils/decorators'
import Expand from './expand'
import Head from './head'
import List from './list'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Temples() {
  return (
    <View style={styles.container}>
      <Head />
      <List />
      <Expand />
    </View>
  )
}

export default obc(Temples, COMPONENT)
