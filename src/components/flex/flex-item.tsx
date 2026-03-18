/*
 * @Author: czy0729
 * @Date: 2023-04-11 12:49:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 05:30:52
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { stl } from '@utils'
import { WEB } from '@constants'

import type { ViewStyle } from '@types'
import type { ItemProps as FlexItemProps } from './types'

function FlexItem({ flex = 1, style, children, ...restProps }: FlexItemProps) {
  const flexItemStyle = useMemo((): ViewStyle => {
    const s: ViewStyle = { flex }
    if (WEB) {
      // @ts-ignore: WEB 环境下的特殊兼容
      s.width = '100%'
    }
    return s
  }, [flex])

  return (
    <View style={stl(flexItemStyle, style)} {...restProps}>
      {children}
    </View>
  )
}

export default React.memo(FlexItem)
