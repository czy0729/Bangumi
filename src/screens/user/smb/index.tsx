/*
 * @Author: czy0729
 * @Date: 2022-03-28 12:31:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-03 13:38:34
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Config from './component/config'
import Form from './component/form'
import List from './component/list'
import ModalFolders from './component/modal-folders'
import Scrape from './component/scrape'
import Header from './header'
import Store from './store'
import { Ctx } from './types'
import './styles'

/** 本地管理 */
const Smb = (_props, { $ }: Ctx) => {
  useMount(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-smb'>
      <Header />
      <Page loaded={$.state._loaded}>
        <List />
        <Form />
      </Page>
      <ModalFolders />
      <Config />
      <Scrape />
    </Component>
  ))
}

export default ic(Store, Smb)
