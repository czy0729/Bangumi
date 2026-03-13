/*
 * @Author: czy0729
 * @Date: 2022-01-22 18:26:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-04 05:29:03
 */
import React from 'react'
import { View } from 'react-native'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Block({ style, title, onBlockRef, children, ...other }: Props) {
  const styles = memoStyles()
  return (
    <View
      ref={title && onBlockRef ? ref => onBlockRef(ref, title) : undefined}
      style={stl(
        styles.block,
        // @ts-expect-error
        children?.length > 1 && styles.padding,
        style
      )}
      {...other}
    >
      {children}
    </View>
  )
}

export default ob(Block, COMPONENT)
