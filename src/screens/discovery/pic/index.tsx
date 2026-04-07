/*
 * @Author: czy0729
 * @Date: 2025-06-09 04:13:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-22 20:34:31
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import Empty from './component/empty'
import List from './component/list'
import Header from './header'
import { usePicPage } from './hooks'

import type { NavigationProps } from '@types'

/** 图集 */
function Pic(props: NavigationProps) {
  const { id, $ } = usePicPage(props)

  const { _loaded, fetching, empty } = $.state

  return (
    <Component id='screen-pic'>
      <StoreContext.Provider value={id}>
        <Page loaded={_loaded} loading={fetching && !$.list.length}>
          {empty && !$.list.length ? <Empty /> : <List />}
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Pic)
