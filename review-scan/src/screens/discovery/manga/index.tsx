/*
 * @Author: czy0729
 * @Date: 2021-01-09 00:57:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:18:10
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Header from '../anime/header'
import List from './component/list'
import { useMangaPage } from './hooks'
import { HM } from './ds'

/** 找漫画 */
const Manga = (props: NavigationProps) => {
  const { id, $ } = useMangaPage(props)

  return useObserver(() => (
    <Component id='screen-manga'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <List $={$} />
        </Page>
        <Header title='找漫画' alias='Manga' hm={HM} />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Manga
