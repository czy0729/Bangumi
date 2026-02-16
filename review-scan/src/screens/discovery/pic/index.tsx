/*
 * @Author: czy0729
 * @Date: 2025-06-09 04:13:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-11 22:14:21
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Empty from './component/empty'
import List from './component/list'
import Header from './header'
import { usePicPage } from './hooks'

/** 图集 */
const Pic = (props: NavigationProps) => {
  const { id, $ } = usePicPage(props)

  return useObserver(() => {
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
  })
}

export default Pic
