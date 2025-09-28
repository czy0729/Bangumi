/*
 * @Author: czy0729
 * @Date: 2025-02-04 06:56:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-28 19:46:05
 */
import React from 'react'
import { HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { styles } from './styles'
import { Props } from './types'

function Location({ color, onScrollTo }: Props) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <HeaderV2Popover
      key={String($.locationDS.length)}
      style={styles.location}
      data={$.locationDS}
      name='md-menu-open'
      color={color}
      onSelect={onScrollTo}
    />
  ))
}

export default Location
