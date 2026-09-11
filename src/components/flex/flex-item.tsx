/*
 * @Author: czy0729
 * @Date: 2023-04-11 12:49:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-11 00:00:00
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { stl } from '@utils'
import { flexItemStyle as getFlexItemStyle } from './utils'

import type { ItemProps as FlexItemProps } from './types'

function FlexItem({ flex = 1, style, children, ...restProps }: FlexItemProps) {
  const flexItemStyle = useMemo(() => getFlexItemStyle({ flex }), [flex])

  return (
    <View style={stl(flexItemStyle, style)} {...restProps}>
      {children}
    </View>
  )
}

export default React.memo(FlexItem)
