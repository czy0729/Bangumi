/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:09:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:20:32
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Header from '../anime/header'
import List from './component/list'
import { useADVPage } from './hooks'
import { HM } from './ds'

/** 找 Gal */
const ADV = (props: NavigationProps) => {
  const { id, $ } = useADVPage(props)

  return useObserver(() => (
    <Component id='screen-adv'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <List $={$} />
        </Page>
        <Header title='找 Gal' alias='ADV' hm={HM} />
      </StoreContext.Provider>
    </Component>
  ))
}

export default ADV
