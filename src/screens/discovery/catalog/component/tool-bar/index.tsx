/*
 * @Author: czy0729
 * @Date: 2024-07-30 11:48:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-12 01:58:32
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ToolBar as ToolBarComp } from '@components'
import { useStore } from '@stores'
import { TYPE_DS } from '../../ds'
import FilterKey from './filter-key'
import FilterType from './filter-type'
import FilterYear from './filter-year'
import Search from './search'
import Type from './type'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const type = TYPE_DS.find(item => item.key === $.state.type)?.['title']

  return (
    <ToolBarComp>
      <Type type={type} />
      {type === '整合' && (
        <>
          <FilterType />
          <FilterYear />
          <FilterKey />
        </>
      )}
      <Search />
    </ToolBarComp>
  )
}

export default observer(ToolBar)
