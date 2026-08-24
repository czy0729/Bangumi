/*
 * @Author: czy0729
 * @Date: 2025-02-04 06:56:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:14:43
 */
import React from 'react'
import { observer } from 'mobx-react'
import { HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Location({ color, onScrollTo }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

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

export default observer(Location)
