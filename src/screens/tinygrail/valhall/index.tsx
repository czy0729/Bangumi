/*
 * @Author: czy0729
 * @Date: 2019-11-29 21:55:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 15:59:32
 */
import React from 'react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import TinygrailHeader from '@tinygrail/_/header'
import TinygrailIconGo from '@tinygrail/_/icon-go'
import TinygrailPage from '@tinygrail/_/page'
import TinygrailToolBar from '@tinygrail/_/tool-bar'
import { SORT_DS } from '@tinygrail/overview/ds'
import { useTinygrailValhallPage } from './hooks'
import List from './list'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 英灵殿 */
const TinygrailValhall = (props: NavigationProps) => {
  const { id, $ } = useTinygrailValhallPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-valhall'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <TinygrailToolBar
            data={SORT_DS}
            level={$.state.level}
            levelMap={$.levelMap}
            sort={$.state.sort}
            direction={$.state.direction}
            onLevelSelect={$.onLevelSelect}
            onSortPress={$.onSortPress}
          />
          <List />
        </TinygrailPage>
        <TinygrailHeader title='英灵殿' hm={HM} headerRight={() => <TinygrailIconGo $={$} />} />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailValhall
