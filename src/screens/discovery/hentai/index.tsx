/*
 * @Author: czy0729
 * @Date: 2020-07-15 11:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-25 05:06:21
 */
import React from 'react'
import { Component, FooterEmptyData, HeaderPlaceholder, Page } from '@components'
import { FilterSwitch, Notice } from '@_'
import { StoreContext, userStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Header from '../anime/header'
import { useHentaiPage } from './hooks'
import List from './list'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 找番剧 */
const Hentai = (props: NavigationProps) => {
  const { id, $ } = useHentaiPage(props)

  return useObserver(() => (
    <Component id='screen-hentai'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <Notice>此页面已不再维护</Notice>
          {userStore.isExtremeLimit ? (
            <>
              <FilterSwitch name='Hentai' />
              <FooterEmptyData />
            </>
          ) : (
            <List $={$} />
          )}
        </Page>
        <Header title='找番剧' alias='Hentai' hm={HM} />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Hentai
