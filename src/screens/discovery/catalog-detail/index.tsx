/*
 * @Author: czy0729
 * @Date: 2020-01-05 21:50:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-12 06:02:04
 */
import React, { useCallback } from 'react'
import { Component, Page } from '@components'
import { useOnScroll } from '@components/header/utils'
import { FolderManageModal } from '@_'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import List from './component/list'
import Tips from './component/tips'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

const CatalogDetail = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  const { fixed, onScroll } = useOnScroll()
  const onScrollFn = useCallback(
    evt => {
      $.onScroll(evt)
      onScroll(evt)
    },
    [$, onScroll]
  )

  return useObserver(() => {
    const { visible, defaultEditItem } = $.state
    return (
      <Component id='screen-catalog-detail'>
        <Header fixed={fixed} />
        <Page statusBarEvent={false}>
          <List onScroll={onScrollFn} />
          <Tips />
        </Page>
        <FolderManageModal
          id={$.catalogId}
          visible={visible}
          defaultExpand={$.catalogId}
          defaultEditItem={defaultEditItem}
          onClose={$.onClose}
        />
      </Component>
    )
  })
}

export default ic(Store, CatalogDetail)
