/*
 * @Author: czy0729
 * @Date: 2024-07-30 11:48:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-30 21:16:40
 */
import React from 'react'
import { ToolBar as ToolBarComp } from '@components'
import { obc } from '@utils/decorators'
import { TYPE_DS } from '../../ds'
import { Ctx } from '../../types'
import FilterKey from './filter-key'
import FilterType from './filter-type'
import FilterYear from './filter-year'
import More from './more'
import Type from './type'
import { COMPONENT } from './ds'

function ToolBar(props, { $ }: Ctx) {
  const type = TYPE_DS.find(item => item.key === $.state.type)?.['title']
  return (
    <ToolBarComp>
      <Type type={type} />
      {type === '高级' && (
        <>
          <FilterType />
          <FilterYear />
          <FilterKey />
        </>
      )}
      <More />
    </ToolBarComp>
  )
}

export default obc(ToolBar, COMPONENT)
