/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:19:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 21:15:41
 */
import React from 'react'
import { Page, Heatmap, Component } from '@components'
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
    <Component id='screen-friends'>
      <Header />
      <Page>
        <Filter />
        <PaginationList2
          keyExtractor={keyExtractor}
          data={$.list}
          scrollToTop
          renderItem={renderItem}
          onHeaderRefresh={$.onRefresh}
        />
      </Page>
      <Heatmap bottom={_.bottom + _.sm} id='好友' screen='Friends' />
    </Component>
  ))
}

export default ic(Store, Friends)
