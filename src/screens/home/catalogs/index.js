/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:54:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 01:00:07
 */
import React from 'react'
import { Page, ListView, Heatmap } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import { keyExtractor } from '@utils/app'
import Header from './header'
import Item from './item'
import Store from './store'

const Catalogs = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header />
      <Page loaded={$.list._loaded}>
        <ListView
          contentContainerStyle={_.container.bottom}
          keyExtractor={keyExtractor}
          data={$.list}
          renderItem={renderItem}
          scrollToTop
          onHeaderRefresh={() => $.fetchSubjectCatalogs(true)}
          onFooterRefresh={$.fetchSubjectCatalogs}
        />
        <Heatmap bottom={_.bottom} id='条目目录' screen='SubjectCatalogs' />
      </Page>
    </>
  ))
}

export default ic(Store, Catalogs)

function renderItem({ item, index }) {
  return <Item item={item} index={index} />
}
