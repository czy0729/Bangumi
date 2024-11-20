/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 15:35:27
 */
import React from 'react'
import { Component, Header, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import IconGo from '@tinygrail/_/icon-go'
import Tabs from '@tinygrail/_/tabs-v2'
import ToolBar from '@tinygrail/_/tool-bar'
import { SORT_DS } from '@tinygrail/overview/ds'
import { NavigationProps } from '@types'
import { useTinygrailNewPage } from './hooks'
import List from './list'
import { TABS } from './ds'

/** 资金日志 */
const TinygrailNew = (props: NavigationProps) => {
  const { id, $ } = useTinygrailNewPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-new'>
      <StoreContext.Provider value={id}>
        <Header
          title='新番榜单'
          hm={['tinygrail/new', 'TinygrailNew']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => <IconGo $={$} />}
        />
        <Page style={_.container.tinygrail} loaded={$.state._loaded}>
          <Tabs
            routes={TABS}
            renderContentHeaderComponent={
              <ToolBar
                data={SORT_DS}
                level={$.state.level}
                levelMap={$.levelMap}
                sort={$.state.sort}
                direction={$.state.direction}
                onLevelSelect={$.onLevelSelect}
                onSortPress={$.onSortPress}
              />
            }
            renderItem={item => <List key={item.key} id={item.key} />}
          />
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailNew
