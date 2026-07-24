/*
 * @Author: czy0729
 * @Date: 2022-01-22 18:26:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 06:13:08
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

export default observer(Block)
