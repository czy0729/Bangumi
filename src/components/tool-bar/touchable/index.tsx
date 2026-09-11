/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:37:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-11 20:27:22
 */
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { memoStyles } from '../styles'
import { flexStyle } from '../../flex'
import { Heatmap } from '../../heatmap'
import { Touchable } from '../../touchable'

import type { Props } from './types'

function ToolBarTouchable({ heatmap, onSelect, children }: Props) {
  const styles = memoStyles()

  return (
    <Touchable
      style={stl(flexStyle({ justify: 'center' }), styles.touch, styles.item)}
      onPress={onSelect}
    >
      {children}
      {!!heatmap && <Heatmap id={heatmap} />}
    </Touchable>
  )
}

export default observer(ToolBarTouchable)
