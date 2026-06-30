/*
 * @Author: czy0729
 * @Date: 2026-06-30 19:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-30 19:20:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { Text } from '../../text'
import { memoStyles } from './styles'

import type { TextProps } from '../../text'

function CodeBlock({ style, children, ...other }: TextProps) {
  const styles = memoStyles()

  return (
    <Text
      style={stl(styles.codeBlock, style)}
      overrideStyle={styles.codeText}
      {...other}
      size={11}
      lineHeight={14}
      selectable
    >
      {children}
    </Text>
  )
}

export default observer(CodeBlock)
