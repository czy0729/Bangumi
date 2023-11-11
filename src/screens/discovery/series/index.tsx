/*
 * @Author: czy0729
 * @Date: 2022-04-15 09:17:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-27 22:12:59
 */
import React from 'react'
import { Component, Page } from '@components'
import { PaginationList } from '@_'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import ToolBar from './tool-bar'
import Item from './item'
import Tips from './tips'
import Store from './store'
import { Ctx } from './types'

const Series = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const { fixed } = $.state
    return (
      <Component id='screen-series'>
        <Header />
        <Page loaded={$.state._loaded}>
          {fixed && <ToolBar />}
          <PaginationList
            key={$.state.sort}
            contentContainerStyle={_.container.bottom}
            data={$.data}
            limit={6}
            ListHeaderComponent={!fixed && <ToolBar />}
            renderItem={renderItem}
            onPage={$.onPage}
          />
          <Tips />
        </Page>
      </Component>
    )
  })
}

export default ic(Store, Series)

function renderItem({ item }) {
  return <Item item={item} />
}
