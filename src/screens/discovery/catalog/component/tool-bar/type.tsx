/*
 * @Author: czy0729
 * @Date: 2024-07-30 11:51:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-30 20:20:32
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { TYPE_DS } from '../../ds'
import { Ctx } from '../../types'

function Type({ type }, { $ }: Ctx) {
  return (
    <ToolBar.Popover
      data={TYPE_DS.map(item => item.title)}
      iconColor={_.colorDesc}
      text={type}
      type='desc'
      onSelect={$.onToggleType}
    />
  )
}

export default obc(Type)
