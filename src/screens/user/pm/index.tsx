/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:03:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-05 05:46:39
 */
import React from 'react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Heatmaps from './component/heatmaps'
import Page from './component/page'
import Header from './header'
import { usePMPage } from './hooks'

import type { NavigationProps } from '@types'

/** 短信 */
const PM = (props: NavigationProps) => {
  const { id, $, navigation } = usePMPage(props)

  return useObserver(() => (
    <Component id='screen-pm'>
      <StoreContext.Provider value={id}>
        <Page $={$} navigation={navigation} />
        <Header />
        <Heatmaps />
      </StoreContext.Provider>
    </Component>
  ))
}

export default PM
