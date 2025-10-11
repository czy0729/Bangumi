/*
 * @Author: czy0729
 * @Date: 2022-01-19 10:21:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:48:35
 */
import React from 'react'
import { View } from 'react-native'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Split() {
  const styles = memoStyles()
  return <View style={styles.split} />
}

export default ob(Split, COMPONENT)
