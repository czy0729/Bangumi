/*
 * @Author: czy0729
 * @Date: 2022-06-06 08:38:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-12 20:55:41
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'

function Search() {
  const { $ } = useStore<Ctx>()
  const { showFilter } = $.state
  return (
    <ToolBar.Icon
      icon='md-search'
      iconColor={showFilter ? _.colorMain : _.colorDesc}
      onSelect={$.onToggleFilter}
    />
  )
}

export default ob(Search)
