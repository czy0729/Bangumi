/*
 * @Author: czy0729
 * @Date: 2020-03-22 18:45:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 16:22:00
 *
 * 用户目录
 */
import { observer } from 'mobx-react'
import { Component, Heatmap, Page } from '@components'
import { CatalogFormModal, FolderManageModal } from '@_'
import { _, StoreContext } from '@stores'
import Tabs from './component/tabs'
import Header from './header'
import { useCatalogsPage } from './hooks'

import type { NavigationProps } from '@types'

/** 用户目录 */
function Catalogs(props: NavigationProps) {
  const { id, $ } = useCatalogsPage(props)

  return (
    <Component id='screen-catalogs'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <Tabs />
        </Page>
        <Header />
        <FolderManageModal visible={$.state.modal} onClose={$.onToggleModal} />
        <CatalogFormModal
          visible={$.state.form}
          onClose={$.onToggleForm}
          onSuccess={$.onSuccessForm}
        />
        <Heatmap bottom={_.bottom} id='用户目录' screen='Catalogs' />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Catalogs)
