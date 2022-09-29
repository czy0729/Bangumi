/*
 * @Author: czy0729
 * @Date: 2019-11-28 16:57:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 17:35:27
 */
import React from 'react'
import { ListView } from '@components'
import { SectionHeader } from '@_'
import { _ } from '@stores'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Item from './item'
import Store from './store'
import { Ctx } from './types'

const RakuenHistory = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    return (
      <>
        <Header />
        <Page loaded={$.state._loaded}>
          <ListView
            key={$.sections.length}
            style={_.container.screen}
            keyExtractor={keyExtractor}
            sections={$.sections}
            scrollToTop
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
          />
        </Page>
      </>
    )
  })
}

export default ic(Store, RakuenHistory)

function keyExtractor(item: { topicId: any }) {
  return String(item.topicId)
}

function renderSectionHeader({ section: { title } }) {
  return <SectionHeader size={14}>{title}</SectionHeader>
}

function renderItem({ item, index }) {
  return <Item index={index} {...item} />
}
