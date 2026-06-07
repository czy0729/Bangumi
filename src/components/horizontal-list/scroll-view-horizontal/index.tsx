/*
 * @Author: czy0729
 * @Date: 2023-11-08 00:47:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 20:07:08
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ScrollView } from '../../scroll-view'

import type { ScrollViewProps } from '../../scroll-view'

function ScrollViewHorizontal({
  children,
  contentContainerStyle,
  ...other
}: Omit<ScrollViewProps, 'horizontal'>) {
  return (
    <ScrollView
      contentContainerStyle={contentContainerStyle}
      scrollEventThrottle={16}
      animated
      horizontal
      {...other}
    >
      {children}
    </ScrollView>
  )
}

export default observer(ScrollViewHorizontal)
