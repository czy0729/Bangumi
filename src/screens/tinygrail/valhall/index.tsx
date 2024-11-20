/*
 * @Author: czy0729
 * @Date: 2019-11-29 21:55:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 11:38:21
 */
import React from 'react'
import { Component, Header, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import IconGo from '@tinygrail/_/icon-go'
import ToolBar from '@tinygrail/_/tool-bar'
import { SORT_DS } from '@tinygrail/overview/ds'
import { NavigationProps } from '@types'
import { useTinygrailValhallPage } from './hooks'
import List from './list'

/** 英灵殿 */
const TinygrailValhall = (props: NavigationProps) => {
  const { id, $ } = useTinygrailValhallPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-valhall'>
      <StoreContext.Provider value={id}>
        <Header
          title='英灵殿'
          hm={['tinygrail/valhall', 'TinygrailValhall']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => <IconGo $={$} />}
        />
        <Page style={_.container.tinygrail}>
          <ToolBar
            style={_.mt._sm}
            data={SORT_DS}
            level={$.state.level}
            levelMap={$.levelMap}
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

export default TinygrailValhall
