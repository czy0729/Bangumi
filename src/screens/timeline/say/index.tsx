/*
 * @Author: czy0729
 * @Date: 2019-10-08 16:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-24 15:26:24
 */
import React from 'react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Heatmaps from './component/heatmaps'
import Page from './component/page'
import Header from './header'
import { useSayPage } from './hooks'

import type { NavigationProps } from '@types'

/** 吐槽 */
const Say = (props: NavigationProps) => {
  const { id } = useSayPage(props)

  return useObserver(() => (
    <Component id='screen-say'>
      <StoreContext.Provider value={id}>
        <Page />
        <Header />
        <Heatmaps />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Say
