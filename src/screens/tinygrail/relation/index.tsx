/*
 * @Author: czy0729
 * @Date: 2020-10-29 20:48:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 15:58:29
 */
import React from 'react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import TinygrailHeader from '@tinygrail/_/header'
import TinygrailIconGo from '@tinygrail/_/icon-go'
import TinygrailPage from '@tinygrail/_/page'
import TinygrailToolBar from '@tinygrail/_/tool-bar'
import { useTinygrailRelationPage } from './hooks'
import List from './list'
import { SORT_DS } from './store'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 关联角色 */
const TinygrailRelation = (props: NavigationProps) => {
  const { id, $ } = useTinygrailRelationPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-relation'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <TinygrailToolBar
            data={SORT_DS}
            level={$.state.level}
            sort={$.state.sort}
            direction={$.state.direction}
            onLevelSelect={$.onLevelSelect}
            onSortPress={$.onSortPress}
          />
          <List />
        </TinygrailPage>
        <TinygrailHeader
          title={$.params?.name || '关联角色'}
          alias='关联角色'
          hm={HM}
          headerRight={() => <TinygrailIconGo $={$} />}
        />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailRelation
