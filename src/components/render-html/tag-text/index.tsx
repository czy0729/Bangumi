/*
 * @Author: czy0729
 * @Date: 2025-03-21 04:51:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-21 05:53:11
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Text } from '../../text'

import type { TextProps } from '../../text'

function TagText({ style, children, ...other }: TextProps) {
  return useObserver(() => (
    <Text style={style} {...other}>
      {children}{' '}
    </Text>
  ))
}

export default TagText
