/*
 * @Author: czy0729
 * @Date: 2022-03-28 12:31:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 21:02:16
 */
import React from 'react'
import './styles'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Config from './component/config'
import Form from './component/form'
import List from './component/list'
import ModalFolders from './component/modal-folders'
import Scrape from './component/scrape'
import Header from './header'
import { useSmbPage } from './hooks'

/** 本地管理 */
const Smb = (props: NavigationProps) => {
  const { id, $ } = useSmbPage(props)

  return useObserver(() => (
    <Component id='screen-smb'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <List />
          <Form />
        </Page>
        <Header />
        <ModalFolders />
        <Config />
        <Scrape />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Smb
