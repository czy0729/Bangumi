/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-23 14:58:44
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { ToolBar as ToolBarComp } from '@components'
import { useStore } from '@stores'
import Area from './area'
import Classification from './classification'
import Expand from './expand'
import Filter from './filter'
import FilterSub from './filter-sub'
import Month from './month'
import Sort from './sort'
import Source from './source'
import Tag from './tag'
import Target from './target'
import Theme from './theme'
import Type from './type'
import Year from './year'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const showExpand = $.typeCn !== '音乐'

    return (
      <View>
        <ToolBarComp>
          <Type />
          <Sort />
          <Year />
          <Month />
          {showExpand && <Expand />}
        </ToolBarComp>
        {showExpand && $.state.expand && (
          <ToolBarComp>
            <Filter />
            <FilterSub />
            <Source />
            <Tag />
            <Theme />
            <Area />
            <Target />
            <Classification />
          </ToolBarComp>
        )}
      </View>
    )
  })
}

export default ToolBar
