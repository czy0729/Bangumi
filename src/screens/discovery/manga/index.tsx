/*
 * @Author: czy0729
 * @Date: 2021-01-09 00:57:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-11 16:59:16
 */
import React from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from '../anime/header'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Manga = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header title='找漫画' alias='Manga' hm={['manga', 'Manga']} />
      <Page loaded={$.state._loaded}>
        <List />
      </Page>
    </>
  ))
}

export default ic(Store, Manga)
