/*
 * @Author: czy0729
 * @Date: 2022-03-28 12:31:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:43:16
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Config from './config'
import Form from './form'
import Header from './header'
import List from './list'
import ModalFolders from './modal-folders'
import Scrape from './scrape'
import Store from './store'
import { Ctx } from './types'

/** 本地管理 */
const Smb = (props, { $ }: Ctx) => {
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
