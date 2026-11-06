/*
 * @Author: czy0729
 * @Date: 2024-01-22 09:30:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:08:58
 *
 * 预设背景 / 随机头像切换
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { SegmentedControl } from '@components'
import { useStore } from '@stores'
import { COMPONENT, DS } from './ds'
import { memoStyles } from './styles'

import type { Values } from '@types'
import type { Ctx } from '../../types'

function Segmented() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleValueChange = useCallback(
    (title: Values<typeof DS>) => {
      $.onValueChange(DS.indexOf(title))
    },
    [$]
  )

  const { _loaded, selectedIndex } = $.state
  if (!_loaded) return null

  const styles = memoStyles()

  return (
    <SegmentedControl
      style={styles.segmented}
      values={DS}
      selectedIndex={selectedIndex}
      onValueChange={handleValueChange}
    />
  )
}

export default observer(Segmented)
