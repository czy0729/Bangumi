/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 22:23:57
 */
import React from 'react'
import { observer } from 'mobx-react'
import { SegmentedControl } from '@components'
import { useStore } from '@stores'
import { SUBJECT_TYPE } from '@constants'
import { COMPONENT, DATA } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Cate() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { _loaded, type } = $.state
  if (!_loaded) return null

  const styles = memoStyles()

  return (
    <SegmentedControl
      style={styles.segment}
      size={11}
      values={DATA}
      selectedIndex={SUBJECT_TYPE.findIndex(item => item.label === type)}
      onValueChange={$.onChange}
    />
  )
}

export default observer(Cate)
