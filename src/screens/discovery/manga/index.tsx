/*
 * @Author: czy0729
 * @Date: 2021-01-09 00:57:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 11:14:27
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Header from '../anime/header'
import List from './component/list'
import { useMangaPage } from './hooks'

/** 找漫画 */
const Manga = (props: NavigationProps) => {
  const { id, $ } = useMangaPage(props)

  return useObserver(() => (
    <Component id='screen-manga'>
      <StoreContext.Provider value={id}>
        <Header title='找漫画' alias='Manga' hm={['manga', 'Manga']} />
        <Page loaded={$.state._loaded}>
          <List $={$} />
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default Manga
