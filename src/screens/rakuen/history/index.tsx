/*
 * @Author: czy0729
 * @Date: 2019-11-28 16:57:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-28 06:26:15
 */
import React from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import SectionList from './section-list'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const RakuenHistory = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const { favor } = $.state
    return (
      <>
        <Header />
        <Page loaded={$.state._loaded}>{favor ? <List /> : <SectionList />}</Page>
      </>
    )
  })
}

export default ic(Store, RakuenHistory)
