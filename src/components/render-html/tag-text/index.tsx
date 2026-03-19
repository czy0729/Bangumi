/*
 * @Author: czy0729
 * @Date: 2025-03-21 04:51:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 03:05:27
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '../../text'

import type { TextProps } from '../../text'

function TagText({ style, children, ...other }: TextProps) {
  return (
    <Text style={style} {...other}>
      {children}{' '}
    </Text>
  )
}

export default observer(TagText)
