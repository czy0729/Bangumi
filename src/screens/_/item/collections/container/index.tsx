/*
 * @Author: czy0729
 * @Date: 2025-01-24 05:56:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-12 00:16:58
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function Container({ active, onPress, children }) {
  const styles = memoStyles()
  const Component = onPress ? Touchable : View

  return (
    <Component style={stl(styles.container, active && styles.active)} onPress={onPress}>
      {children}
    </Component>
  )
}

export default ob(Container)
