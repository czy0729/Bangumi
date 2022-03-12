/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-11 17:40:56
 */
import React from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from '../anime/header'
import List from './list'
import Store from './store'

const Wenku = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header title='找文库' alias='文库' hm={['wenku', 'Wenku']} />
      <Page>
        <List />
      </Page>
    </>
  ))
}

export default ic(Store, Wenku)
