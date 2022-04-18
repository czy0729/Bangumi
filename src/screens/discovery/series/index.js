/*
 * @Author: czy0729
 * @Date: 2022-04-15 09:17:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-19 02:23:26
 */
import React from 'react'
import { Page, Header } from '@components'
import { PaginationList } from '@_'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Item from './item'
import Tips from './tips'
import Store from './store'

const Series = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    return (
      <>
        <Header title='系列' hm={['series', 'Series']} />
        <Page loaded={$.state._loaded}>
          <PaginationList
            contentContainerStyle={_.container.bottom}
            data={$.state.data}
            renderItem={({ item }) => <Item {...item} />}
            onPage={$.onPage}
          />
          <Tips />
        </Page>
      </>
    )
  })
}

export default ic(Store, Series)
