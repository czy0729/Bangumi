/*
 * @Author: czy0729
 * @Date: 2021-01-09 00:57:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 01:05:27
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Header from '../anime/header'
import List from './list'
import Store from './store'
import { Ctx } from './types'

/** 找漫画 */
const Manga = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-manga'>
      <Header title='找漫画' alias='Manga' hm={['manga', 'Manga']} />
      <Page loaded={$.state._loaded}>
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, Manga)
