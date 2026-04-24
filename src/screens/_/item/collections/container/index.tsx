/*
 * @Author: czy0729
 * @Date: 2025-01-24 05:56:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-24 11:29:35
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable } from '@components'
import { stl } from '@utils'
import { memoStyles } from './styles'

import type { Props } from './types'

function Container({ active, onPress, children }: Props) {
  const styles = memoStyles()

  const Component = onPress ? Touchable : View

  return (
    <Component style={stl(styles.container, active && styles.active)} onPress={onPress}>
      {children}
    </Component>
  )
}

export default observer(Container)
