/*
 * @Author: czy0729
 * @Date: 2019-09-09 17:34:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-17 07:11:30
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import Tabs from './component/tabs'
import Header from './header'
import { useCharacterPage } from './hooks'

import type { NavigationProps } from '@types'

/** 用户人物 */
function Character(props: NavigationProps) {
  const { id, $ } = useCharacterPage(props)

  return (
    <Component id='screen-character'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded} loading={$.loading}>
          <Tabs />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Character)
