/*
 * @Author: czy0729
 * @Date: 2024-10-24 21:04:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-24 21:11:40
 */
import React from 'react'
import { ToolBar } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function Reverse(_props, { $ }: Ctx) {
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

export default obc(Reverse)
