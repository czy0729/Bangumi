/*
 * @Author: czy0729
 * @Date: 2023-11-04 15:38:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 14:10:02
 *
 * 数量/排名切换
 */
import { observer } from 'mobx-react'
import { SegmentedControl } from '@components'
import { r } from '@utils/dev'
import { COMPONENT, DS } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function RecSegement({ value, onValueChange }: Props) {
  r(COMPONENT)

  return (
    <SegmentedControl
      style={styles.segment}
      size={11}
      values={DS}
      selectedIndex={value ? 1 : 0}
      onValueChange={onValueChange}
    />
  )
}

export default observer(RecSegement)
