/*
 * @Author: czy0729
 * @Date: 2022-01-22 18:26:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 05:26:59
 */
import React from 'react'
import { View } from 'react-native'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function Block({ children }) {
  const styles = memoStyles()
  return (
    <View style={stl(styles.block, children?.length > 1 && styles.padding)}>
      {children}
    </View>
  )
}

export default ob(Block)
