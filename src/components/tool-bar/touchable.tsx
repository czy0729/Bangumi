/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:37:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-05 19:37:52
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex } from '../flex'
import { Touchable } from '../touchable'
import { Heatmap } from '../heatmap'
import { memoStyles } from './styles'

export const ToolBarTouchable = observer(({ heatmap, onSelect, children }) => {
  const styles = memoStyles()
  return (
    <Touchable style={styles.touch} onPress={onSelect}>
      <Flex style={styles.item} justify='center'>
        {children}
      </Flex>
      {!!heatmap && <Heatmap id={heatmap} />}
    </Touchable>
  )
})
