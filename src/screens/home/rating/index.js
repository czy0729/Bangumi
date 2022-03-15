/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:22:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 17:45:10
 */
import React from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Tab from './tab'
import Store from './store'

const Rating = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header />
      <Page loaded={$.state._loaded}>
        <Tab />
      </Page>
    </>
  ))
}

export default ic(Store, Rating)
