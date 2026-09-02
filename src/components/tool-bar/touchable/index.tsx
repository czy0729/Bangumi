/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:37:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 23:26:34
 */
import React from 'react'
import { observer } from 'mobx-react'
import { memoStyles } from '../styles'
import { Flex } from '../../flex'
import { Heatmap } from '../../heatmap'
import { Touchable } from '../../touchable'

import type { Props } from './types'

function ToolBarTouchable({ heatmap, onSelect, children }: Props) {
  const styles = memoStyles()

  return (
    <Touchable style={styles.touch} onPress={onSelect}>
      <Flex style={styles.item} justify='center'>
        {children}
      </Flex>
      {!!heatmap && <Heatmap id={heatmap} />}
    </Touchable>
  )
}

export default observer(ToolBarTouchable)
