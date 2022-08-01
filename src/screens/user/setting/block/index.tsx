/*
 * @Author: czy0729
 * @Date: 2022-01-22 18:26:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-01 17:50:33
 */
import React from 'react'
import { View } from 'react-native'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function Block({ children }) {
  const styles = memoStyles()
  return (
    <View style={[styles.block, children?.length > 1 && styles.padding]}>
      {children}
    </View>
  )
}

export default ob(Block)
