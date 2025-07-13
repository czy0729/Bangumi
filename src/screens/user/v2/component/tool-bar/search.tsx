/*
 * @Author: czy0729
 * @Date: 2022-06-06 08:38:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-13 20:55:15
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'

function Search() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const { showFilter } = $.state
    return (
      <ToolBar.Icon
        icon='md-search'
        iconColor={showFilter ? _.colorMain : _.colorDesc}
        onSelect={$.onToggleFilter}
      />
    )
  })
}

export default Search
