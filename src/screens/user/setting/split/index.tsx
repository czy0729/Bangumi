/*
 * @Author: czy0729
 * @Date: 2022-01-19 10:21:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-01 17:52:34
 */
import React from 'react'
import { View } from 'react-native'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function Split() {
  const styles = memoStyles()
  return <View style={styles.split} />
}

export default ob(Split)
