/*
 * @Author: czy0729
 * @Date: 2020-01-05 21:50:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-06 15:51:27
 */
import React from 'react'
import { Page } from '@components'
import { useOnScroll } from '@components/header/utils'
import { FolderManageModal } from '@_'
import { useRunAfter, useObserver } from '@utils/hooks'
import { ic } from '@utils/decorators'
import Header from './header'
import List from './list'
import Tips from './tips'
import Store from './store'
import { Ctx } from './types'

const CatalogDetail = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  const { fixed, onScroll } = useOnScroll()
  return useObserver(() => {
    const { visible, defaultEditItem } = $.state
    return (
      <>
        <Header fixed={fixed} />
        <Page>
          <List onScroll={onScroll} />
          <Tips />
        </Page>
        <FolderManageModal
          id={$.catalogId}
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
