/*
 * @Author: czy0729
 * @Date: 2024-07-30 11:51:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:11:57
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TYPE_DS } from '../../ds'
import { Ctx } from '../../types'

function Type({ type }) {
  const { $ } = useStore<Ctx>()
  return (
    <ToolBar.Popover
      data={TYPE_DS.map(item => item.title)}
      icon='icon-more-grid'
      iconColor={_.colorDesc}
      text={type}
      type='desc'
      onSelect={$.onToggleType}
    />
  )
}

export default ob(Type)
