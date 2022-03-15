/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:54:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 22:22:57
 */
import React from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import ListAll from './list-all'
import Store from './store'

const Mine = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const { type } = $.state
    return (
      <>
        <Header />
        <Page>{type === 'mine' ? <List /> : <ListAll />}</Page>
      </>
    )
  })
}

export default ic(Store, Mine)
