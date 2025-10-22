/*
 * @Author: czy0729
 * @Date: 2024-10-24 21:04:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-22 01:23:28
 */
import React from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'

import type { Ctx } from '../../types'

function Reverse() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <ToolBar.Icon
      iconStyle={{
        transform: [
          {
            rotate: $.state.reverse ? '90deg' : '-90deg'
          }
        ]
      }}
      icon='md-arrow-back'
      onSelect={$.onReverse}
    />
  ))
}

export default Reverse
