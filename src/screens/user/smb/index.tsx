/*
 * @Author: czy0729
 * @Date: 2022-03-28 12:31:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-26 21:59:36
 */
import { observer } from 'mobx-react'
import './styles'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import Config from './component/config'
import Form from './component/form'
import List from './component/list'
import ModalFolders from './component/modal-folders'
import Scrape from './component/scrape'
import Header from './header'
import { useSmbPage } from './hooks'

import type { NavigationProps } from '@types'

/** 本地管理 */
function Smb(props: NavigationProps) {
  const { id, $ } = useSmbPage(props)

  return (
    <Component id='screen-smb'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <List />
          <Form />
        </Page>
        <Header />
        <ModalFolders />
        <Config />
        <Scrape />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Smb)
