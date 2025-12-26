/*
 * @Author: czy0729
 * @Date: 2021-01-09 00:57:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:20:23
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Header from '../anime/header'
import List from './component/list'
import { useMangaPage } from './hooks'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 找漫画 */
const Manga = (props: NavigationProps) => {
  const { id, $ } = useMangaPage(props)

  return useObserver(() => (
    <Component id='screen-manga'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <List $={$} />
        </Page>
        <Header title='找漫画' alias='Manga' hm={HM} />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Manga
