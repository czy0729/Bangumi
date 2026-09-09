/*
 * @Author: czy0729
 * @Date: 2019-10-08 16:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:24:47
 */
import { observer } from 'mobx-react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import Heatmaps from './component/heatmaps'
import Page from './component/page'
import Header from './header'
import { useSayPage } from './hooks'

import type { NavigationProps } from '@types'

/** 吐槽 */
function Say(props: NavigationProps) {
  const { id } = useSayPage(props)

  return (
    <Component id='screen-say'>
      <StoreContext.Provider value={id}>
        <Page />
        <Header />
        <Heatmaps />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Say)
