/*
 * @Author: czy0729
 * @Date: 2024-10-24 21:04:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-28 15:47:03
 */
import React from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'

function Reverse() {
  const { $ } = useStore<Ctx>()
  return (
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
  )
}

export default ob(Reverse)
