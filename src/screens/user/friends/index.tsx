/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:19:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-07 07:37:33
 */
import React from 'react'
import { Page, Heatmap } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Filter from './filter'
import { renderItem, keyExtractor } from './utils'
import Store from './store'
import { Ctx } from './types'

const Friends = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header />
      <Page>
        <PaginationList2
          keyExtractor={keyExtractor}
          data={$.friends.list}
          scrollToTop
          ListHeaderComponent={<Filter />}
          renderItem={renderItem}
          onHeaderRefresh={$.onRefresh}
        />
      </Page>
      <Heatmap bottom={_.bottom + _.sm} id='好友' screen='Friends' />
    </>
  ))
}

export default ic(Store, Friends)
