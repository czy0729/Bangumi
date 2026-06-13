/*
 * @Author: czy0729
 * @Date: 2020-07-15 11:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:21:07
 */
import React from 'react'
import { Component, FooterEmptyData, HeaderPlaceholder, Page } from '@components'
import { FilterSwitch } from '@_'
import { StoreContext, userStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Header from '../anime/header'
import List from './component/list'
import { useNSFWPage } from './hooks'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 找番剧 */
const NSFW = (props: NavigationProps) => {
  const { id, $ } = useNSFWPage(props)

  return useObserver(() => (
    <Component id='screen-nsfw'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          {userStore.isExtremeLimit ? (
            <>
              <FilterSwitch name='NSFW' />
              <FooterEmptyData />
            </>
          ) : (
            <List />
          )}
        </Page>
        <Header title='找条目' alias='NSFW' hm={HM} />
      </StoreContext.Provider>
    </Component>
  ))
}

export default NSFW
