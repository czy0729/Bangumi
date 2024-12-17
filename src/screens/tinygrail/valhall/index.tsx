/*
 * @Author: czy0729
 * @Date: 2019-11-29 21:55:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 15:59:32
 */
import React from 'react'
import { Component, HeaderV2, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import IconGo from '@tinygrail/_/icon-go'
import ToolBar from '@tinygrail/_/tool-bar'
import { SORT_DS } from '@tinygrail/overview/ds'
import { NavigationProps } from '@types'
import { useTinygrailValhallPage } from './hooks'
import List from './list'
import { HM } from './ds'

/** 英灵殿 */
const TinygrailValhall = (props: NavigationProps) => {
  const { id, $ } = useTinygrailValhallPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-valhall'>
      <StoreContext.Provider value={id}>
        <Page style={[_.container.tinygrail, _.container.header]}>
          <ToolBar
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
        <HeaderV2
          backgroundStyle={_.container.tinygrail}
          title='英灵殿'
          hm={HM}
          headerRight={() => <IconGo $={$} />}
        />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailValhall
