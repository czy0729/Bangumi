/*
 * @Author: czy0729
 * @Date: 2025-02-04 06:56:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-04 07:12:54
 */
import React from 'react'
import { HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { styles } from './styles'

function Location({ color, onScrollTo }) {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2Popover
      key={String($.locationDS.length)}
      style={styles.location}
      data={$.locationDS}
      name='md-menu-open'
      color={color}
      onSelect={onScrollTo}
    />
  )
}

export default ob(Location)
