/*
 * @Author: czy0729
 * @Date: 2019-10-08 16:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 05:44:27
 */
import React from 'react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Heatmaps from './component/heatmaps'
import Page from './component/page'
import Header from './header'
import { useSayPage } from './hooks'

/** 吐槽 */
const Say = (props: NavigationProps) => {
  const { id, $, navigation } = useSayPage(props)

  return useObserver(() => (
    <Component id='screen-say'>
      <StoreContext.Provider value={id}>
        <Page $={$} navigation={navigation} />
        <Header />
        <Heatmaps />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Say
