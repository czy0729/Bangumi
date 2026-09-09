/*
 * @Author: czy0729
 * @Date: 2020-10-29 20:48:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:44:43
 */
import { observer } from 'mobx-react'
import { Component } from '@components'
import { StoreContext } from '@stores'
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
function TinygrailRelation(props: NavigationProps) {
  const { id, $ } = useTinygrailRelationPage(props)

  return (
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
  )
}

export default observer(TinygrailRelation)
