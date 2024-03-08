/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:10:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 06:41:57
 */
import React from 'react'
import { View } from 'react-native'
import { ob } from '@utils/decorators'
import Cover from './cover'
import Detail from './detail'
import Expand from './expand'
import Starforce from './starforce'
import Title from './title'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Info() {
  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <Cover />
      <Title />
      <Starforce />
      <Detail />
      <Expand />
    </View>
  )
}

export default ob(Info, COMPONENT)
