/*
 * @Author: czy0729
 * @Date: 2022-01-22 18:26:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 23:49:13
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function Block({ style, title, onBlockRef, children, ...other }: Props) {
  r(COMPONENT)

  const styles = memoStyles()

  /** children 为多个元素时加内边距 (单个元素由具体组件自控间距) */
  const isGrouped = Array.isArray(children) && children.length > 1

  return (
    <View
      ref={title && onBlockRef ? ref => onBlockRef(ref, title) : undefined}
      style={stl(styles.block, isGrouped && styles.padding, style)}
      {...other}
    >
      {children}
    </View>
  )
}

export default observer(Block)
