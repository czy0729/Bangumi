/*
 * @Author: czy0729
 * @Date: 2020-10-29 20:48:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 15:58:29
 */
import React from 'react'
import { Component, Header, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import IconGo from '../_/icon-go'
import ToolBar from '../_/tool-bar'
import { useTinygrailRelationPage } from './hooks'
import List from './list'
import { SORT_DS } from './store'

/** 关联角色 */
const TinygrailRelation = (props: NavigationProps) => {
  const { id, $ } = useTinygrailRelationPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-relation'>
      <StoreContext.Provider value={id}>
        <Header
          title={$.params?.name || '关联角色'}
          alias='关联角色'
          hm={['tinygrail/relation', 'TinygrailRelation']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => <IconGo $={$} />}
        />
        <Page style={_.container.tinygrail}>
          <ToolBar
            style={_.mt._sm}
            data={SORT_DS}
            level={$.state.level}
            sort={$.state.sort}
            direction={$.state.direction}
            onLevelSelect={$.onLevelSelect}
            onSortPress={$.onSortPress}
          />
          <List />
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailRelation
