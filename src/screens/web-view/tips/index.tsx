/*
 * @Author: czy0729
 * @Date: 2023-06-23 14:19:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-08 19:37:55
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Web from '@screens/web-view/versions/component/web'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

const Tips = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    return (
      <Component id='screen-tips'>
        <Header />
        <Page>{!!$.state._loaded && <Web uri={$.state.uri} />}</Page>
      </Component>
    )
  })
}

export default ic(Store, Tips)
