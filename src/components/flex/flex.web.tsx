/*
 * @Author: czy0729
 * @Date: 2023-06-01 01:49:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 09:12:01
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { stl } from '@utils'
import FlexItem from './flex-item'
import { getFlexValue } from './utils'

import type { ViewStyle } from 'react-native'
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
    (): ViewStyle => ({
      // @ts-ignore
      zIndex: 'unset',
      flexDirection: direction,
      flexWrap: wrap,
      justifyContent: getFlexValue(justify) as ViewStyle['justifyContent'],
      alignItems: getFlexValue(align) as ViewStyle['alignItems'],
      ...(wrap === 'wrap' ? { maxWidth: '100%' } : {})
    }),
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
