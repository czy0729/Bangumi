/*
 * @Author: czy0729
 * @Date: 2022-03-28 12:31:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-23 10:29:28
 */
import React from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import Form from './form'
import Store from './store'
import { Ctx } from './types'

const Smb = (props, { $ }: Ctx) => {
  useMount(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header />
      <Page loaded={$.state._loaded}>
        <List />
        <Form />
      </Page>
    </>
  ))
}

export default ic(Store, Smb)
