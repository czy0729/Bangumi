/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:52:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 08:59:56
 */
import React from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Typerank = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const { _loaded } = $.state
    return (
      <>
        <Header />
        <Page>{_loaded && <List />}</Page>
      </>
    )
  })
}

export default ic(Store, Typerank)
