/*
 * @Author: czy0729
 * @Date: 2019-04-04 05:24:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-11 00:00:00
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { stl } from '@utils'
import FlexItem from './flex-item'
import { flexStyle as getFlexStyle } from './utils'

import type { Props as FlexProps } from './types'

/** Flex 布局 */
function Flex({
  style,
  direction = 'row',
  wrap = 'nowrap',
  justify = 'start',
  align = 'center',
  children,
  ...restProps
}: FlexProps) {
  const flexStyle = useMemo(
    () => getFlexStyle({ direction, wrap, justify, align }),
    [direction, wrap, justify, align]
  )

  return (
    <View style={stl(flexStyle, style)} {...restProps}>
      {children}
    </View>
  )
}

const MemoFlex = React.memo(Flex) as unknown as typeof Flex & {
  Item: typeof FlexItem
}

MemoFlex.Item = FlexItem

export default MemoFlex
