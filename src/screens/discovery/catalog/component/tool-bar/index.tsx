/*
 * @Author: czy0729
 * @Date: 2024-07-30 11:48:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:11:41
 */
import React from 'react'
import { ToolBar as ToolBarComp } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TYPE_DS } from '../../ds'
import { Ctx } from '../../types'
import FilterKey from './filter-key'
import FilterType from './filter-type'
import FilterYear from './filter-year'
import Type from './type'
import { COMPONENT } from './ds'

function ToolBar() {
  const { $ } = useStore<Ctx>()
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
    </ToolBarComp>
  )
}

export default ob(ToolBar, COMPONENT)
