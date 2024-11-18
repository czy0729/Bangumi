/*
 * @Author: czy0729
 * @Date: 2024-01-22 09:30:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:49:12
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, DS } from './ds'
import { styles } from './styles'

function Segmented() {
  const { $ } = useStore<Ctx>()
  return (
    <SegmentedControl
      key={String($.state._loaded)}
      style={styles.segmented}
      values={DS}
      selectedIndex={$.state.selectedIndex}
      onValueChange={title => $.onValueChange(DS.indexOf(title))}
    />
  )
}

export default ob(Segmented, COMPONENT)
