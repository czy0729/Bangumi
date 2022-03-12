/*
 * @Author: czy0729
 * @Date: 2020-01-05 21:50:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-12 16:35:01
 */
import React from 'react'
import { Page, ListView } from '@components'
import { useOnScroll } from '@components/header/utils'
import { FolderManageModal } from '@_'
import { _ } from '@stores'
import { useRunAfter, useObserver } from '@utils/hooks'
import { ic } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import { TEXT_18X } from '@constants/text'
import Header from './header'
import Info from './info'
import Item from './item'
import Store from './store'

const CatalogDetail = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  const { fixed, onScroll } = useOnScroll()
  return useObserver(() => {
    const { layout, visible, defaultEditItem } = $.state
    const numColumns = $.isList ? undefined : $.gridNum
    return (
      <>
        <Header fixed={fixed} />
        <Page>
          <ListView
            key={`${layout}${numColumns}`}
            contentContainerStyle={_.container.bottom}
            keyExtractor={keyExtractor}
            numColumns={numColumns}
            data={$.catalogDetail}
            ListHeaderComponent={<Info />}
            renderItem={renderItem}
            scrollEventThrottle={16}
            scrollToTop
            footerEmptyDataText={TEXT_18X}
            onScroll={onScroll}
            onHeaderRefresh={$.fetchCatalogDetail}
          />
        </Page>
        <FolderManageModal
          id={$.subjectId}
          visible={visible}
          defaultExpand={$.catalogId}
          defaultEditItem={defaultEditItem}
          onClose={$.onClose}
        />
      </>
    )
  })
}

export default ic(Store, CatalogDetail)

function renderItem({ index, item }) {
  return <Item index={index} item={item} />
}
