/*
 * @Author: czy0729
 * @Date: 2022-04-15 09:17:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-27 06:52:53
 */
import React from 'react'
import { Page } from '@components'
import { PaginationList } from '@_'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import ToolBar from './tool-bar'
import Item from './item'
import Tips from './tips'
import Store from './store'

const Series = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header />
      <Page loaded={$.state._loaded}>
        <PaginationList
          key={$.state.sort}
          contentContainerStyle={_.container.bottom}
          data={$.data}
          ListHeaderComponent={<ToolBar />}
          renderItem={({ item }) => <Item item={item} />}
          onPage={$.onPage}
        />
        <Tips />
      </Page>
    </>
  ))
}

export default ic(Store, Series)
