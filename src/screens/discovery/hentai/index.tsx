/*
 * @Author: czy0729
 * @Date: 2020-07-15 11:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找 Hentai
 */
import { observer } from 'mobx-react'
import { Component, FooterEmptyData, HeaderPlaceholder, Page } from '@components'
import { FilterSwitch, Notice } from '@_'
import { StoreContext, userStore } from '@stores'
import Header from '../anime/header'
import List from './component/list'
import { useHentaiPage } from './hooks'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 找 Hentai */
function Hentai(props: NavigationProps) {
  const { id, $ } = useHentaiPage(props)

  return (
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
            <List />
          )}
        </Page>
        <Header title='找番剧' alias='Hentai' hm={HM} />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Hentai)
