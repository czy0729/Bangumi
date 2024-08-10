/*
 * @Author: czy0729
 * @Date: 2020-01-05 21:50:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 20:02:12
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Modal from './component/modal'
import Tips from './component/tips'
import Header from './header'
import { useCatalogDetailPage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** 目录详情 */
const CatalogDetail = (props, context: Ctx) => {
  const { fixed, onScroll } = useCatalogDetailPage(context)
  return useObserver(() => (
    <Component id='screen-catalog-detail'>
      <Header fixed={fixed} />
      <Page statusBarEvent={false}>
        <List onScroll={onScroll} />
        <Tips />
      </Page>
      <Modal />
    </Component>
  ))
}

export default ic(Store, CatalogDetail)
