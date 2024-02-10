/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:37:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-08 17:20:03
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Web from './component/web'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

const Versions = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-versions'>
      <Header />
      <Page>{!!$.state._loaded && <Web uri={$.state.uri} />}</Page>
    </Component>
  ))
}

export default ic(Store, Versions)
