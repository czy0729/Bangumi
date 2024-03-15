/*
 * @Author: czy0729
 * @Date: 2024-03-16 04:02:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-16 04:07:01
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { TYPE_DS } from '../../ds'
import { Ctx } from '../../types'

function Type(props, { $ }: Ctx) {
  return (
    <ToolBar.Popover
      data={TYPE_DS.map(item => item.title)}
      icon='md-filter-list'
      iconColor={_.colorDesc}
      text={TYPE_DS.find(item => item.key === $.state.type)?.['title']}
      type='desc'
      onSelect={$.onToggleType}
    />
  )
}

export default obc(Type)
