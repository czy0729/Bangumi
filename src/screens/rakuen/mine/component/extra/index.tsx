/*
 * @Author: czy0729
 * @Date: 2022-02-24 18:55:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 02:20:49
 */
import React from 'react'
import { observer } from 'mobx-react'
import { SegmentedControl } from '@components'
import { r } from '@utils/dev'
import { COMPONENT, TYPE_DS } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Extra({ $ }: Ctx) {
  r(COMPONENT)

  const { type, _loaded } = $.state
  if (!_loaded) return null

  return (
    <SegmentedControl
      style={styles.segment}
      size={11}
      values={TYPE_DS}
      selectedIndex={type === 'all' ? 1 : 0}
      onValueChange={$.onChange}
    />
  )
}

export default observer(Extra)
