/*
 * @Author: czy0729
 * @Date: 2022-06-06 08:38:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:13:33
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'

import type { Ctx } from '../../types'

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

export default observer(Search)
