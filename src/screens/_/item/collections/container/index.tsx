/*
 * @Author: czy0729
 * @Date: 2025-01-24 05:56:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-24 05:59:13
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable } from '@components'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function Container({ onPress, children }) {
  const styles = memoStyles()
  const Component = onPress ? Touchable : View
  return (
    <Component style={styles.container} onPress={onPress}>
      {children}
    </Component>
  )
}

export default ob(Container)
