/*
 * @Author: czy0729
 * @Date: 2020-01-05 21:50:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-07 08:59:38
 */
import React from 'react'
import { Component, Page } from '@components'
import { FolderManageModal } from '@_'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Tips from './component/tips'
import Header from './header'
import { useCatalogDetailPage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** 目录详情 */
const CatalogDetail = (props, context: Ctx) => {
  const { fixed, onScroll } = useCatalogDetailPage(context)
  const { $ } = context
  return useObserver(() => (
    <Component id='screen-catalog-detail'>
      <Header fixed={fixed} />
      <Page statusBarEvent={false}>
        <List onScroll={onScroll} />
        <Tips />
      </Page>
      <FolderManageModal
        id={$.catalogId}
        visible={$.state.visible}
        defaultExpand={$.catalogId}
        defaultEditItem={$.state.defaultEditItem}
        onClose={$.onClose}
      />
    </Component>
  ))
}

export default ic(Store, CatalogDetail)
