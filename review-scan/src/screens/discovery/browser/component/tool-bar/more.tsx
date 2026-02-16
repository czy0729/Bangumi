/*
 * @Author: czy0729
 * @Date: 2022-06-04 07:25:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:58:58
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'

function More() {
  const { $ } = useStore<Ctx>()
  return (
    <ToolBar.Popover
      data={$.toolBar}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={16}
      type='desc'
      transparent
      onSelect={$.onToolBar}
    />
  )
}

export default ob(More)
