/*
 * @Author: czy0729
 * @Date: 2019-09-09 17:34:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-25 05:03:50
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Tabs from './component/tabs'
import Header from './header'
import { useCharacterPage } from './hooks'

import type { NavigationProps } from '@types'

/** 用户人物 */
const Character = (props: NavigationProps) => {
  const { id, $ } = useCharacterPage(props)

  return useObserver(() => (
    <Component id='screen-character'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded} loading={$.loading}>
          <HeaderPlaceholder />
          <Tabs />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Character
