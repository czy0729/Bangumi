/*
 * @Author: czy0729
 * @Date: 2019-09-09 17:34:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:31:58
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Heatmaps from './component/heatmaps'
import Tabs from './component/tabs'
import Header from './header'
import { useCharacterPage } from './hooks'

/** 用户人物 */
const Character = (props: NavigationProps) => {
  const { id, $ } = useCharacterPage(props)

  return useObserver(() => (
    <Component id='screen-character'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page>{!!$.state._loaded && <Tabs />}</Page>
        <Heatmaps />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Character
