/*
 * @Author: czy0729
 * @Date: 2022-03-28 12:31:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-27 16:31:37
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import Form from './form'
import ModalFolders from './modal-folders'
import Config from './config'
import Scrape from './scrape'
import Store from './store'
import { Ctx } from './types'

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
