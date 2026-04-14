/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-14 09:59:49
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

  const styles = memoStyles()

  return (
    <SegmentedControl
      style={styles.segment}
      size={11}
      values={DATA}
      selectedIndex={SUBJECT_TYPE.findIndex(item => item.label === $.state.type)}
      onValueChange={$.onChange}
    />
  )
}

export default observer(Cate)
